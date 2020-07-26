import { v4 as uuid } from "uuid";
import { EntryType, Iso8601String } from "../../types/types";
import { Todo, TodoDate, TodosDay, TodoStatus } from "./redux/todosTypes";
import { createTodayTodoDate } from "./utils/todoDateUtils";

export function createTodosDay(args: { date?: TodoDate; todos?: readonly Todo[] }): TodosDay {
  return {
    date: args.date ?? createTodayTodoDate(),
    todos: args.todos ?? []
  };
}

export function createTodo(args: { value: string }): Todo {
  return {
    id: uuid(),
    type: EntryType.TODO,
    value: args.value,
    status: TodoStatus.NOT_STARTED,
    date: new Date().toISOString() as Iso8601String
  };
}
