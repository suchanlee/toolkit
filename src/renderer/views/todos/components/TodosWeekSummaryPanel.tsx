import { Switch } from "@blueprintjs/core";
import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PanelContainer } from "../../../shared-components/PanelContainer";
import { TodosActions } from "../redux/todosActions";
import { selectSummaryTodosWeek, selectTodosSummaryDate } from "../redux/todosSelectors";
import { todoDateToStr } from "../utils/todoDateUtils";
import { TodosWeekSummaryDay } from "./TodosWeekSummaryDay";

require("./TodosWeekSummaryPanel.scss");

export const TodosWeekSummaryPanel = memo(() => {
  const date = useSelector(selectTodosSummaryDate);
  const week = useSelector(selectSummaryTodosWeek);
  const [showInProgress, setShowInProgress] = useState(true);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(TodosActions.setSummary(undefined));
  }, [dispatch]);
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
          {week.map(day => (
            <TodosWeekSummaryDay key={day.date.day} day={day} showInProgress={showInProgress} />
          ))}
        </div>
      )}
    </PanelContainer>
  );
});
