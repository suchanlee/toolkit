import * as React from "react";
import { isDateToday, isDateYesterday } from "../../../utils/dateUtils";
import { TodoDate, TodosDay } from "../redux/todosTypes";
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
      </div>
    );
  }
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
