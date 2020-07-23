import { setWith, TypedReducer } from "redoodle";
import { InternalTodosActions, TodosActions } from "./todosActions";
import { TodosState } from "./todosState";

export const todosReducer = TypedReducer.builder<TodosState>()
  .withHandler(InternalTodosActions.setTodos.TYPE, (state, payload) => {
    return setWith(state, {
      days: payload.days ?? state.days,
      dateStrs: payload.dateStrs ?? state.dateStrs
    });
  })
  .withHandler(InternalTodosActions.setGroups.TYPE, (state, payload) => {
    return setWith(state, {
      groups: payload
    });
  })
  .withHandler(TodosActions.setActive.TYPE, (state, payload) => {
    return setWith(state, {
      activeDate: payload
    });
  })
  .withHandler(TodosActions.setSummary.TYPE, (state, payload) => {
    return setWith(state, {
      summaryDate: payload
    });
  })
  .build();
