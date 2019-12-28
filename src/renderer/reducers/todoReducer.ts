import { TypedReducer } from "redoodle";
import { InternalTodoActions } from "../actions/todoActions";
import { TodoState } from "../states/todoState";

export const todoReducer = TypedReducer.builder<TodoState | undefined>()
  .withHandler(InternalTodoActions.setTodos.TYPE, (_state, payload) => {
    return payload;
  })
  .build();
