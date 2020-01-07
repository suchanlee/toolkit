import { setWith, TypedReducer } from "redoodle";
import { InternalTodosActions, TodosActions } from "./todosActions";
import { TodosState } from "./todosState";

export const todosReducer = TypedReducer.builder<TodosState>()
  .withHandler(InternalTodosActions.setTodosDays.TYPE, (state, payload) => {
    return setWith(state, {
      todosDays: payload
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
  .build();
