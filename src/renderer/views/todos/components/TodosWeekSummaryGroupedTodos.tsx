import { groupBy } from "lodash-es";
import React from "react";
import { Todo } from "../redux/todosTypes";
import { TODO_DEFAULT_GROUP } from "../todosObjects";
import { linkifyText } from "../utils/linkifyText";
import { getTodoGroups } from "../utils/todoGroupUtils";

export interface TodosWeekSummaryGroupedTodosProps {
  todos: readonly Todo[];
}

export const TodosWeekSummaryGroupedTodos = function({ todos }: TodosWeekSummaryGroupedTodosProps) {
  const groupedTodos = groupBy(todos, todo => todo.group);
  const groups = getTodoGroups(todos);
  return (
    <React.Fragment>
      {groups.map(group => (
        <React.Fragment key={group ?? TODO_DEFAULT_GROUP}>
          <div>{group ?? TODO_DEFAULT_GROUP}</div>
          <ul>
            {groupedTodos[group!].map(todo => (
              <li key={todo.id}>{linkifyText(todo.value)}</li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
