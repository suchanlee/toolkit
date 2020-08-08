import React, { memo } from "react";
import { TodosDay, TodoStatus } from "../redux/todosTypes";
import { createTodayTodoDate, isTodoDatesEqual, todoDateToDate } from "../utils/todoDateUtils";
import { TodosWeekSummaryGroupedTodos } from "./TodosWeekSummaryGroupedTodos";

const DAY_OF_WEEK = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday "
];

export interface TodosWeekSummaryDayProps {
  day: TodosDay;
  showInProgress: boolean;
}

export const TodosWeekSummaryDay = memo((props: TodosWeekSummaryDayProps) => {
  const { day, showInProgress } = props;
  const dayOfWeek = DAY_OF_WEEK[todoDateToDate(day.date).getDay()];
  const isToday = isTodoDatesEqual(day.date, createTodayTodoDate());
  const finishedTodos = day.todos.filter(todo => todo.status === TodoStatus.FINISHED);
  const inProgressTodos = day.todos.filter(todo => todo.status === TodoStatus.IN_PROGRESS);

  if (finishedTodos.length === 0 && (!showInProgress || inProgressTodos.length === 0)) {
    return null;
  }
  return (
    <React.Fragment key={dayOfWeek}>
      <h2>
        {dayOfWeek} {isToday ? "(TODAY)" : ""}
      </h2>
      {finishedTodos.length > 0 && (
        <React.Fragment>
          <h4 className="todos-week-summary-panel-finished">FINISHED</h4>
          <TodosWeekSummaryGroupedTodos todos={finishedTodos} />
        </React.Fragment>
      )}
      {showInProgress && inProgressTodos.length > 0 && (
        <React.Fragment>
          <h4 className="todos-week-summary-panel-in-progress">IN PROGRESS</h4>
          <TodosWeekSummaryGroupedTodos todos={inProgressTodos} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
});
