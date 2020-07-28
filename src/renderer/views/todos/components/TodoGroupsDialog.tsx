import { Button, Classes, ControlGroup, Dialog, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import React, { memo, useCallback, useState } from "react";

require("./TodoGroupsDialog.scss");

export interface TodoGroupsDialogProps {
  isOpen: boolean;
  onClose(): void;
}

export const TodoGroupsDialog = memo(({ isOpen, onClose }: TodoGroupsDialogProps) => {
  const [groupName, setGroupName] = useState("");
  const handleNameChange = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      setGroupName(evt.currentTarget.value);
    },
    [setGroupName]
  );

  return (
    <Dialog
      className={classNames(Classes.DARK, "todo-groups-dialog")}
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Todo Groups"
    >
      <div className="todo-groups-dialog-body">
        <div className="todo-groups-dialog-heading">ADD GROUP</div>
        <ControlGroup>
          <InputGroup
            fill={true}
            placeholder="Name of group"
            value={groupName}
            onChange={handleNameChange}
          />
          <Button icon="plus" title="Click to add group" />
        </ControlGroup>
      </div>
      <div className="todo-groups-dialog-body">
        <div className="todo-groups-dialog-heading">CURRENT GROUPS</div>
      </div>
    </Dialog>
  );
});
