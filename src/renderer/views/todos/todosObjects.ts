import { v4 as uuid } from "uuid";
import { EntryType, Iso8601String } from "../../types/types";
import { Todo, TodoDate, TodosDay, TodoStatus } from "./redux/todosTypes";
import { createTodayTodoDate } from "./utils/todoDateUtils";

export function createTodosDay(args: {
  date?: TodoDate;
  todos?: readonly Todo[];
  groups?: readonly string[];
}): TodosDay {
  return {
    date: args.date ?? createTodayTodoDate(),
    todos: args.todos ?? [],
    groups: args.groups ?? []
  };
}

export function createTodo(args: { value: string; group?: string }): Todo {
  return {
    id: uuid(),
    type: EntryType.TODO,
    value: args.value,
    group: args.group,
    status: TodoStatus.NOT_STARTED,
    date: new Date().toISOString() as Iso8601String
  };
}

export const TODO_DEFAULT_GROUP = "Day Todos";
