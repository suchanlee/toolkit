import { Todo } from "../redux/todosTypes";

export function getTodoGroups(todos: readonly Todo[]) {
  const groups: (string | undefined)[] = [];
  for (const todo of todos) {
    if (!groups.includes(todo.group)) {
      groups.push(todo.group);
    }
  }

  return groups;
}
