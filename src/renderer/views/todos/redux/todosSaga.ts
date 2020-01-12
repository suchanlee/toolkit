import { ipcRenderer } from "electron-better-ipc";
import { setWith, TypedAction } from "redoodle";
import { put, select, takeLatest } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { createTodo, createTodosDay } from "../todosObjects";
import { todoDateToStr } from "../utils/todoDateUtils";
import { InternalTodosActions, TodosActions } from "./todosActions";
import {
  selectTodosDateStrs,
  selectTodosDays,
  selectTodosHasToday,
  selectTodosPersist,
  selectTodosToday
} from "./todosSelectors";
import { PersistedTodos, TodosDay, TodosDaysByDateStrs } from "./todosTypes";

const TODOS_FILE_NAME = "todos";

export function* todosSaga() {
  yield initializeTodos();
  yield takeLatest(TodosActions.initToday.TYPE, createTodosToday);
  yield takeLatest(TodosActions.addTodo.TYPE, addTodo);
  yield takeLatest(TodosActions.removeTodo.TYPE, removeTodo);
  yield takeLatest(TodosActions.setTodoStatus.TYPE, setTodoStatus);
}

function* initializeTodos() {
  let persisted: PersistedTodos | undefined = yield ipcRenderer.callMain(
    IpcEvent.READ_DATA,
    TODOS_FILE_NAME
  );

  if (persisted == null) {
    persisted = {
      todosDays: [],
      groups: {}
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
  yield put(InternalTodosActions.setGroups(persisted.groups));
}

function* createTodosToday() {
  const hasToday: boolean = yield select(selectTodosHasToday);
  if (hasToday) {
    return;
  }

  const today = createTodosDay({});
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

  const { value, type } = action.payload;
  const days: TodosDaysByDateStrs = yield select(selectTodosDays);
  const newDays = setWith(days, {
    [todoDateToStr(today.date)]: {
      ...today,
      todos: [createTodo({ value, todoType: type }), ...today.todos]
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

function* writeTodos(todos?: PersistedTodos) {
  const toPersist: PersistedTodos = todos ?? (yield select(selectTodosPersist));
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: TODOS_FILE_NAME,
    data: toPersist
  });
}
