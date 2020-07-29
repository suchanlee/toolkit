import { Button, ButtonGroup, EditableText } from "@blueprintjs/core";
import React, { memo, useCallback } from "react";
import { TodoGroup } from "../redux/todosTypes";

require("./TodoGroupItem.scss");

export interface TodoGroupItemProps {
  group: TodoGroup;
  updateGroup: (group: TodoGroup) => void;
  removeGroup: (id: string) => void;
  moveGroup: (groupId: string, direction: "up" | "down") => void;
}

export const TodoGroupItem = memo(
  ({ group, updateGroup, removeGroup, moveGroup }: TodoGroupItemProps) => {
    const handleNameConfirm = useCallback(
      name => {
        if (name.trim().length > 0) {
          updateGroup({ ...group, name });
        }
      },
      [group, updateGroup]
    );
    const handleUpClick = useCallback(() => {
      moveGroup(group.id, "up");
    }, [moveGroup, group]);
    const handleDownClick = useCallback(() => {
      moveGroup(group.id, "down");
    }, [moveGroup, group]);
    const handleRemoveClick = useCallback(() => {
      removeGroup(group.id);
    }, [removeGroup, group.id]);

    return (
      <div className="todo-group-item">
        <EditableText
          className="todo-group-item-name"
          defaultValue={group.name}
          onConfirm={handleNameConfirm}
        />
        <ButtonGroup className="todo-group-item-button-group">
          <Button
            className="first-button"
            icon="arrow-up"
            onClick={handleUpClick}
            title="Move group up"
          />
          <Button icon="arrow-down" onClick={handleDownClick} title="Move group down" />
          <Button icon="trash" onClick={handleRemoveClick} title="Remove group" />
        </ButtonGroup>
      </div>
    );
  }
);
