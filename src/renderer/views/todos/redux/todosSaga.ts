import { ipcRenderer } from "electron-better-ipc";
import { setWith, TypedAction } from "redoodle";
import { all, put, select, takeLatest } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { createGroup, createTodo, createTodosDay } from "../todosObjects";
import { todoDateToStr } from "../utils/todoDateUtils";
import { InternalTodosActions, TodosActions } from "./todosActions";
import {
  selectTodosDateStrs,
  selectTodosDays,
  selectTodosGroups,
  selectTodosHasToday,
  selectTodosLatestDay,
  selectTodosPersist,
  selectTodosToday
} from "./todosSelectors";
import {
  PersistedTodos,
  Todo,
  TodoGroup,
  TodosDay,
  TodosDaysByDateStrs,
  TodoStatus
} from "./todosTypes";

const TODOS_FILE_NAME = "todos";

export function* todosSaga() {
  yield initializeTodos();
  yield all([
    yield takeLatest(TodosActions.initToday.TYPE, createTodosToday),
    yield takeLatest(TodosActions.addTodo.TYPE, addTodo),
    yield takeLatest(TodosActions.removeTodo.TYPE, removeTodo),
    yield takeLatest(TodosActions.setTodoStatus.TYPE, setTodoStatus),
    yield takeLatest(TodosActions.addGroup.TYPE, addGroup),
    yield takeLatest(TodosActions.updateGroup.TYPE, updateGroup),
    yield takeLatest(TodosActions.removeGroup.TYPE, removeGroup),
    yield takeLatest(TodosActions.moveGroup.TYPE, moveGroup)
  ]);
}

function* initializeTodos() {
  let persisted: PersistedTodos | undefined = yield ipcRenderer.callMain(
    IpcEvent.READ_DATA,
    TODOS_FILE_NAME
  );

  if (persisted == null) {
    persisted = {
      todosDays: [],
      groups: []
    };
    yield writeTodos(persisted);
  }

  const days: TodosDaysByDateStrs = {};
  const dateStrs: string[] = [];

  for (const day of persisted.todosDays) {
    const dateStr = todoDateToStr(day.date);
    dateStrs.push(dateStr);
    days[dateStr] = day;
  }

  yield put(
    InternalTodosActions.setTodos({
      days,
      dateStrs
    })
  );

  const groups = Array.isArray(persisted.groups) ? persisted.groups : [];
  yield put(InternalTodosActions.setGroups(groups));
}

function* createTodosToday(action: TypedAction<TodosActions.InitTodayPayload>) {
  const hasToday: boolean = yield select(selectTodosHasToday);
  if (hasToday) {
    return;
  }

  const { shouldInherit } = action.payload;
  const latestDay: TodosDay | undefined = yield select(selectTodosLatestDay);
  let todos: readonly Todo[] = [];

  if (latestDay != null) {
    todos = latestDay.todos.filter(todo => todo.status !== TodoStatus.FINISHED && shouldInherit);
  }

  const today = createTodosDay({ todos });
  const todayDateStr = todoDateToStr(today.date);
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const dateStrs: readonly string[] = yield select(selectTodosDateStrs);

  const newDays = setWith(days, {
    [todayDateStr]: today
  });
  const newDateStrs = [todayDateStr, ...dateStrs];

  yield put(
    InternalTodosActions.setTodos({
      days: newDays,
      dateStrs: newDateStrs
    })
  );
  yield put(TodosActions.setActive(today.date));
  yield writeTodos();
}

function* addTodo(action: TypedAction<TodosActions.AddTodoPayload>) {
  const today: TodosDay | undefined = yield select(selectTodosToday);

  // if today has not yet been initialized, do nothing
  if (today == null) {
    return;
  }

  const { value } = action.payload;
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const newDays = setWith(days, {
    [todoDateToStr(today.date)]: {
      ...today,
      todos: [createTodo({ value }), ...today.todos]
    }
  });
  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* removeTodo(action: TypedAction<TodosActions.RemoveTodoPayload>) {
  const { date, todoId } = action.payload;
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const dateStr = todoDateToStr(date);
  const day = days[dateStr];

  if (day == null) {
    return;
  }

  const newDays = setWith(days, {
    [dateStr]: {
      ...day,
      todos: day.todos.filter(todo => todo.id !== todoId)
    }
  });

  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* setTodoStatus(action: TypedAction<TodosActions.SetTodoStatusPayload>) {
  const { date, todoId, status } = action.payload;
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const dateStr = todoDateToStr(date);
  const day = days[dateStr];

  if (day == null) {
    return;
  }

  const newDays = setWith(days, {
    [dateStr]: {
      ...day,
      todos: day.todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        } else {
          return {
            ...todo,
            status
          };
        }
      })
    }
  });

  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* addGroup(action: TypedAction<string>) {
  const groups: readonly TodoGroup[] = yield select(selectTodosGroups);
  const newGroups = groups.concat(createGroup(action.payload));

  yield put(InternalTodosActions.setGroups(newGroups));
  yield writeTodos();
}

function* removeGroup(action: TypedAction<string>) {
  const groups: readonly TodoGroup[] = yield select(selectTodosGroups);
  const groupId = action.payload;
  const newGroups = groups.filter(group => group.id !== groupId);

  yield put(InternalTodosActions.setGroups(newGroups));
  yield writeTodos();
}

function* updateGroup(action: TypedAction<TodoGroup>) {
  const groups: readonly TodoGroup[] = yield select(selectTodosGroups);
  const updatedGroup = action.payload;

  const index = groups.findIndex(group => group.id === updatedGroup.id);
  if (index < 0) {
    return;
  }

  const newGroups = [...groups];
  newGroups[index] = updatedGroup;

  yield put(InternalTodosActions.setGroups(newGroups));
  yield writeTodos();
}

function* moveGroup(action: TypedAction<TodosActions.MoveGroupPayload>) {
  const groups: readonly TodoGroup[] = yield select(selectTodosGroups);
  const { id, direction } = action.payload;

  const index = groups.findIndex(group => group.id === id);
  if (index < 0) {
    return;
  } else if (index === 0 && direction === "up") {
    return;
  } else if (index === groups.length - 1 && direction === "down") {
    return;
  }

  const newGroups = [...groups];
  if (direction === "up") {
    const temp = newGroups[index - 1];
    newGroups[index - 1] = newGroups[index];
    newGroups[index] = temp;
  } else if (direction === "down") {
    const temp = newGroups[index + 1];
    newGroups[index + 1] = newGroups[index];
    newGroups[index] = temp;
  }

  yield put(InternalTodosActions.setGroups(newGroups));
  yield writeTodos();
}

function* writeTodos(todos?: PersistedTodos) {
  const toPersist: PersistedTodos = todos ?? (yield select(selectTodosPersist));
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: TODOS_FILE_NAME,
    data: toPersist
  });
}
