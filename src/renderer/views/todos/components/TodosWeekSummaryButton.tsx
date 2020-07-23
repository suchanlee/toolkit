import { Button } from "@blueprintjs/core";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TodosActions } from "../redux/todosActions";
import { TodoDate } from "../redux/todosTypes";

require("./TodosWeekSummaryButton.scss");

export interface TodosWeekSummaryButtonProps {
  date: TodoDate;
}

export const TodosWeekSummaryButton = memo(({ date }: TodosWeekSummaryButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = useCallback(
    (evt: React.SyntheticEvent) => {
      dispatch(TodosActions.setSummary(date));
      // this component is rendered on top of a TodosDayItem, so want to prevent that from
      // registering click.
      evt.stopPropagation();
    },
    [dispatch, date]
  );

  return (
    <Button className="todos-week-summary-button" minimal={true} onClick={handleClick}>
      SUMMARY
    </Button>
  );
});
