import { TypedAction } from "redoodle";
import { TodoDate, TodoGroupsById, TodosDay } from "./todosTypes";

export namespace TodosActions {
  export const setActive = TypedAction.define("todos::set-active")<TodoDate | undefined>();
  export const initToday = TypedAction.defineWithoutPayload("todos::init-today")();
}

export namespace InternalTodosActions {
  export const setTodosDays = TypedAction.define("internal-todos::set-todos-days")<
    readonly TodosDay[]
  >();
  export const setGroups = TypedAction.define("internal-todos::set-groups")<TodoGroupsById>();
}
