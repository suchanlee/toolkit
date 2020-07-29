import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodosActions } from "../redux/todosActions";
import { selectTodosGroups } from "../redux/todosSelectors";
import { TodoGroup } from "../redux/todosTypes";
import { TodoGroupItem } from "./TodoGroupItem";

require("./TodoGroupsList.scss");

export const TodoGroupsList = () => {
  const groups = useSelector(selectTodosGroups);
  const dispatch = useDispatch();

  const handleUpdateGroup = useCallback(
    (group: TodoGroup) => {
      dispatch(TodosActions.updateGroup(group));
    },
    [dispatch]
  );
  const handleMoveGroup = useCallback(
    (id: string, direction: "up" | "down") => {
      dispatch(TodosActions.moveGroup({ id, direction }));
    },
    [dispatch]
  );
  const handleRemoveGroup = useCallback(
    (id: string) => {
      dispatch(TodosActions.removeGroup(id));
    },
    [dispatch]
  );

  return (
    <div className="todo-groups-list">
      {groups.length === 0 && <p className="todo-groups-list-empty">No groups. Create one!</p>}
      {groups.map(group => (
        <TodoGroupItem
          key={group.id}
          group={group}
          updateGroup={handleUpdateGroup}
          moveGroup={handleMoveGroup}
          removeGroup={handleRemoveGroup}
        />
      ))}
    </div>
  );
};
