import { TypedReducer } from "redoodle";
import { TodoState } from "../states/todoState";
import { InternalTodoActions } from "../actions/todoActions";

export const todoReducer = TypedReducer.builder<TodoState | undefined>()
  .withHandler(InternalTodoActions.setTodos.TYPE, (_state, payload) => {
    return payload;
  })
  .build();
