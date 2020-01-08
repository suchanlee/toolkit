import { ipcRenderer } from "electron-better-ipc";
import { TypedAction } from "redoodle";
import { put, select, takeLatest } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { createTodo, createTodosDay } from "../todosObjects";
import { InternalTodosActions, TodosActions } from "./todosActions";
import {
  selectTodosDays,
  selectTodosHasToday,
  selectTodosPersist,
  selectTodosToday
} from "./todosSelectors";
import { PersistedTodos, TodosDay } from "./todosTypes";

const TODOS_FILE_NAME = "todos";

export function* todosSaga() {
  yield initializeTodos();
  yield takeLatest(TodosActions.initToday.TYPE, createTodosToday);
  yield takeLatest(TodosActions.addTodo.TYPE, addTodo);
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

  yield put(InternalTodosActions.setTodosDays(persisted.todosDays));
  yield put(InternalTodosActions.setGroups(persisted.groups));
}

function* createTodosToday() {
  const hasToday: boolean = yield select(selectTodosHasToday);
  if (hasToday) {
    return;
  }

  const today = createTodosDay({});
  const todosDays: readonly TodosDay[] = yield select(selectTodosDays);
  const newDays = [today, ...todosDays];

  yield put(InternalTodosActions.setTodosDays(newDays));
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
  const todo = createTodo({ value, todoType: type });
  const newToday: TodosDay = {
    ...today,
    todos: [todo, ...today.todos]
  };

  const todoDays: readonly TodosDay[] = yield select(selectTodosDays);
  // know that today will always be the latest day, meaning first item in array
  const newTodosDays: readonly TodosDay[] = [newToday, ...todoDays.slice(1)];
  yield put(InternalTodosActions.setTodosDays(newTodosDays));
  yield writeTodos();
}

function* writeTodos(todos?: PersistedTodos) {
  const toPersist: PersistedTodos = todos ?? (yield select(selectTodosPersist));
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: TODOS_FILE_NAME,
    data: toPersist
  });
}
