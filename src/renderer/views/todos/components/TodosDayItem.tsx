import * as React from "react";
import { isDateToday, isDateYesterday } from "../../../utils/dateUtils";
import { Todo, TodoDate, TodosDay, TodoStatus } from "../redux/todosTypes";
import { todoDateToDate, todoDateToStr } from "../utils/todoDateUtils";

require("./TodosDayItem.scss");

export namespace TodosDayItem {
  export interface Props {
    day: TodosDay;
  }
}

export class TodosDayItem extends React.PureComponent<TodosDayItem.Props> {
  public render() {
    const { day } = this.props;
    return (
      <div className="todos-day-item">
        <div className="todos-day-item-date">{getDateStr(day.date)}</div>
        <div className="todos-day-item-status">{this.renderStatus()}</div>
      </div>
    );
  }

  private renderStatus() {
    const todosByStatus = getTodosByStatus(this.props.day.todos);
    if (isDateToday(todoDateToDate(this.props.day.date))) {
      return (
        <React.Fragment>
          <span className="todos-day-item-status-item -finished">
            FINISHED ({todosByStatus[TodoStatus.FINISHED]})
          </span>{" "}
          /
          <span className="todos-day-item-status-item -in-progress">
            IN PROGRESS ({todosByStatus[TodoStatus.IN_PROGRESS]})
          </span>{" "}
          /
          <span className="todos-day-item-status-item -not-started">
            NOT STARTED ({todosByStatus[TodoStatus.NOT_STARTED]})
          </span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span className="todos-day-item-status-item -finished">
            FINISHED ({todosByStatus[TodoStatus.FINISHED]})
          </span>{" "}
          /
          <span className="todos-day-item-status-item -in-progress">
            UNFINISHED (
            {todosByStatus[TodoStatus.IN_PROGRESS] + todosByStatus[TodoStatus.NOT_STARTED]})
          </span>
        </React.Fragment>
      );
    }
  }
}

function getTodosByStatus(todos: readonly Todo[]) {
  const todosByStatus: Record<string, number> = {
    [TodoStatus.NOT_STARTED]: 0,
    [TodoStatus.IN_PROGRESS]: 0,
    [TodoStatus.FINISHED]: 0
  };

  for (const todo of todos) {
    todosByStatus[todo.status] += 1;
  }

  return todosByStatus;
}

function getDateStr(todoDate: TodoDate) {
  const date = todoDateToDate(todoDate);
  const str = todoDateToStr(todoDate);
  if (isDateToday(date)) {
    return `${str} (Today)`;
  } else if (isDateYesterday(date)) {
    return `${str} (Yesterday)`;
  }
  return str;
}
