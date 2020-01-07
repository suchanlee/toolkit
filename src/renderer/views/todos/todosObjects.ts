import { Todo, TodoDate, TodosDay } from "./redux/todosTypes";
import { createTodayTodoDate } from "./utils/todoDateUtils";

export function createTodosDay(args: { date?: TodoDate; todos?: readonly Todo[] }): TodosDay {
  return {
    date: args.date ?? createTodayTodoDate(),
    todos: args.todos ?? []
  };
}
