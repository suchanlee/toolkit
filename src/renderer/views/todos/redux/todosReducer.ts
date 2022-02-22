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
  .withHandler(TodosActions.setViewOptions.TYPE, (state, payload) => {
    return setWith(state, {
      viewOptions: payload
    });
  })
  .build();
