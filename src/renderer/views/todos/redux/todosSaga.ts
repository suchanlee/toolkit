import { ipcRenderer } from "electron-better-ipc";
import { put, select, takeLatest } from "redux-saga/effects";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { createTodosDay } from "../todosObjects";
import { InternalTodosActions, TodosActions } from "./todosActions";
import { selectTodosDays, selectTodosHasToday, selectTodosPersist } from "./todosSelectors";
import { PersistedTodos, TodosDay } from "./todosTypes";

const TODOS_FILE_NAME = "todos";

export function* todosSaga() {
  yield initializeTodos();
  yield takeLatest(TodosActions.initToday.TYPE, createTodosToday);
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
    writeTodos(persisted);
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

  const toPersist = yield select(selectTodosPersist);
  writeTodos(toPersist);
}

function writeTodos(todos: PersistedTodos) {
  ipcRenderer.callMain(IpcEvent.WRITE_DATA, {
    fileName: TODOS_FILE_NAME,
    data: todos
  });
}
