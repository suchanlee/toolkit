import { Checkbox } from "@blueprintjs/core";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodosActions } from "../redux/todosActions";
import { selectTodosToday, selectTodosViewOptions } from "../redux/todosSelectors";
import { TodoStatus } from "../redux/todosTypes";

require("./TodosControls.scss");

export interface TodosControlsProps {}

export function TodosControls() {
  const dispatch = useDispatch();
  const viewOptions = useSelector(selectTodosViewOptions);
  const todosToday = useSelector(selectTodosToday);

  const numFinished = useMemo(() => {
    if (todosToday == null) {
      return null;
    }
    let num = 0;
    todosToday.todos.forEach(todo => {
      if (todo.status === TodoStatus.FINISHED) {
        num += 1;
      }
    });
    return num;
  }, [todosToday]);

  return (
    <div className="todos-controls-container">
      <Checkbox
        label={`Hide Finished ${numFinished != null ? `(${numFinished})` : ""}`}
        checked={viewOptions.isFinishedHidden}
        onChange={evt => {
          dispatch(
            TodosActions.setViewOptions({
              ...viewOptions,
              isFinishedHidden: evt.currentTarget.checked
            })
          );
        }}
      />
    </div>
  );
}
