import * as React from "react";
import { TodosDay } from "../redux/todosTypes";
import { todoDateToStr } from "../utils/todoDateUtils";

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
        <div className="todos-day-item-date">{todoDateToStr(day.date)}</div>
      </div>
    );
  }
}
