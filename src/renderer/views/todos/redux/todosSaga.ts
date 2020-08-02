import { ipcRenderer } from "electron-better-ipc";
import { groupBy } from "lodash-es";
import { setWith, TypedAction } from "redoodle";
import { all, put, select, takeLatest } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { createTodo, createTodosDay } from "../todosObjects";
import { isTodayTodoDate, todoDateToStr } from "../utils/todoDateUtils";
import { getTodoGroups } from "../utils/todoGroupUtils";
import { InternalTodosActions, TodosActions } from "./todosActions";
import {
  selectTodosDateStrs,
  selectTodosDays,
  selectTodosHasToday,
  selectTodosLatestDay,
  selectTodosPersist,
  selectTodosToday
} from "./todosSelectors";
import { PersistedTodos, Todo, TodosDay, TodosDaysByDateStrs, TodoStatus } from "./todosTypes";

const TODOS_FILE_NAME = "todos";

export function* todosSaga() {
  yield initializeTodos();
  yield all([
    yield takeLatest(TodosActions.initToday.TYPE, createTodosToday),
    yield takeLatest(TodosActions.addTodo.TYPE, addTodo),
    yield takeLatest(TodosActions.removeTodo.TYPE, removeTodo),
    yield takeLatest(TodosActions.setTodoStatus.TYPE, setTodoStatus),
    yield takeLatest(TodosActions.updateGroup.TYPE, updateGroup),
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
      todosDays: []
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

  const { value, group: todoGroup } = action.payload;
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const todosByGroup = groupBy(today.todos, todo => todo.group);
  const groups = getTodoGroups(today.todos);

  if (!groups.includes(todoGroup)) {
    groups.push(todoGroup);
  }

  const newTodos: Todo[] = [];
  for (const group of groups) {
    const todos = todosByGroup[group!] ?? [];
    if (group === todoGroup) {
      newTodos.push(createTodo({ value, group: todoGroup }), ...todos);
    } else {
      newTodos.push(...todos);
    }
  }

  const newDays = setWith(days, {
    [todoDateToStr(today.date)]: {
      ...today,
      todos: newTodos
    }
  });
  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* removeTodo(action: TypedAction<TodosActions.RemoveTodoPayload>) {
  const { date, todoId } = action.payload;
  if (!isTodayTodoDate(date)) {
    return;
  }

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
  if (!isTodayTodoDate(date)) {
    return;
  }

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

function* updateGroup(action: TypedAction<TodosActions.UpdateGroupPayload>) {
  const { date, curGroup, newGroup } = action.payload;
  if (!isTodayTodoDate(date) || curGroup.trim() === newGroup.trim()) {
    return;
  }

  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const dateStr = todoDateToStr(date);
  const day = days[dateStr];

  if (day == null) {
    return;
  }

  let isUpdated = false;
  const todos: Todo[] = [];
  for (const todo of day.todos) {
    if (todo.group === curGroup) {
      todos.push({ ...todo, group: newGroup });
      isUpdated = true;
    } else {
      todos.push(todo);
    }
  }

  if (!isUpdated) {
    return;
  }

  const newDays = setWith(days, {
    [dateStr]: {
      ...day,
      todos
    }
  });

  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* moveGroup(action: TypedAction<TodosActions.MoveGroupPayload>) {
  const { date, group, direction } = action.payload;
  if (!isTodayTodoDate(date)) {
    return;
  }

  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const dateStr = todoDateToStr(date);
  const day = days[dateStr];

  if (day == null) {
    return;
  }

  const groups = getTodoGroups(day.todos);
  const index = groups.findIndex(g => g === group);
  if (index < 0) {
    return;
  } else if (index === 0 && direction === "up") {
    return;
  } else if (index === groups.length - 1 && direction === "down") {
    return;
  }

  if (direction === "up") {
    const temp = groups[index - 1];
    groups[index - 1] = groups[index];
    groups[index] = temp;
  } else if (direction === "down") {
    const temp = groups[index + 1];
    groups[index + 1] = groups[index];
    groups[index] = temp;
  }

  const todosByGroup = groupBy(day.todos, todo => todo.group);
  const newTodos: Todo[] = [];

  for (const group of groups) {
    newTodos.push(...todosByGroup[group!]);
  }

  const newDays = setWith(days, {
    [dateStr]: {
      ...day,
      todos: newTodos
    }
  });

  yield put(InternalTodosActions.setTodos({ days: newDays }));
  yield writeTodos();
}

function* writeTodos(todos?: PersistedTodos) {
  const toPersist: PersistedTodos = todos ?? (yield select(selectTodosPersist));
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: TODOS_FILE_NAME,
    data: toPersist
  });
}
