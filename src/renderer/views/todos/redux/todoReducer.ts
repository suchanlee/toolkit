import { TypedReducer } from "redoodle";
import { InternalTodoActions } from "./todosActions";
import { TodosState } from "./todosState";

export const todoReducer = TypedReducer.builder<TodosState>()
  .withHandler(InternalTodoActions.setTodos.TYPE, (_state, payload) => {
    return payload;
  })
  .build();
