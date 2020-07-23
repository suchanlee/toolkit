import { Switch } from "@blueprintjs/core";
import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { TodosActions } from "../redux/todosActions";
import { selectSummaryTodosWeek, selectTodosSummaryDate } from "../redux/todosSelectors";
import { TodoStatus } from "../redux/todosTypes";
import { linkifyText } from "../utils/linkifyText";
import {
  createTodayTodoDate,
  isTodoDatesEqual,
  todoDateToDate,
  todoDateToStr
} from "../utils/todoDateUtils";

require("./TodosWeekSummaryPanel.scss");

const DAY_OF_WEEK = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday "
];

export const TodosWeekSummaryPanel = memo(() => {
  const date = useSelector(selectTodosSummaryDate);
  const week = useSelector(selectSummaryTodosWeek);
  const [showInProgress, setShowInProgress] = useState(true);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(TodosActions.setSummary(undefined));
  }, [dispatch]);
  const todayDate = createTodayTodoDate();
  return (
    <PanelContainer
      className="todos-panel-container"
      title={
        date != null ? `Summary for the week of ${todoDateToStr(date)}` : "Summary date not set."
      }
      isOpen={date != null}
      onClose={handleClose}
    >
      {date != null && (
        <div className="todos-week-summary-panel">
          <div>
            <Switch
              checked={showInProgress}
              onChange={() => setShowInProgress(!showInProgress)}
              label="Show In Progress Todos"
            />
          </div>
          {week.map(day => {
            const dayOfWeek = DAY_OF_WEEK[todoDateToDate(day.date).getDay()];
            const isToday = isTodoDatesEqual(day.date, todayDate);
            const finishedTodos = day.todos.filter(todo => todo.status === TodoStatus.FINISHED);
            const inProgressTodos = day.todos.filter(
              todo => todo.status === TodoStatus.IN_PROGRESS
            );
            return (
              <React.Fragment key={dayOfWeek}>
                <h2>
                  {dayOfWeek} {isToday ? "(TODAY)" : ""}
                </h2>
                {finishedTodos.length > 0 && (
                  <React.Fragment>
                    <h4 className="todos-week-summary-panel-finished">FINISHED</h4>
                    <ul>
                      {finishedTodos.map(task => (
                        <li key={task.id}>{linkifyText(task.value)}</li>
                      ))}
                    </ul>
                  </React.Fragment>
                )}
                {showInProgress && inProgressTodos.length > 0 && (
                  <React.Fragment>
                    <h4 className="todos-week-summary-panel-in-progress">FINISHED</h4>
                    <ul>
                      {inProgressTodos.map(task => (
                        <li key={task.id}>{linkifyText(task.value)}</li>
                      ))}
                    </ul>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </PanelContainer>
  );
});
