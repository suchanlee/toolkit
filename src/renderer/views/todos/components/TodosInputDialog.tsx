import { Classes, Dialog, InputGroup } from "@blueprintjs/core";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { TODO_DEFAULT_GROUP } from "../todosObjects";

require("./TodosInputDialog.scss");

export interface TodosInputDialogProps {
  isOpen: boolean;
  groups: readonly (string | undefined)[];
  onClose(): void;
  addTodo(group?: string): void;
}

export const TodosInputDialog = ({ groups, isOpen, onClose, addTodo }: TodosInputDialogProps) => {
  const [group, setGroup] = useState("");
  useEffect(() => {
    const handleKeyUp = (evt: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      const numKey = parseInt(evt.key, 10);
      if (isNaN(numKey)) {
        return;
      }

      const index = numKey === 0 ? 9 : numKey - 1;
      const group = groups[index];
      // have to account for undefined group (Day Todos)
      if (group != null || groups.length > index) {
        addTodo(group);
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isOpen, groups, addTodo]);

  useEffect(() => {
    if (!isOpen) {
      setGroup("");
    }
  }, [isOpen, setGroup]);

  const handleInputChange = useCallback(
    (evt: React.SyntheticEvent<HTMLInputElement>) => {
      setGroup(evt.currentTarget.value);
    },
    [setGroup]
  );

  const handleInputKeyUp = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (evt.key === "Enter") {
        addTodo(group);
      }
    },
    [group, addTodo]
  );

  return (
    <Dialog
      className={classNames(Classes.DARK, "todos-input-dialog")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="todos-input-new-group">
        <p>Add todo to new group</p>
        <InputGroup
          fill={true}
          type="text"
          placeholder="Group name"
          value={group}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyUp}
        />
      </div>
      <div className="todos-input-existing-group">
        <p>Add todo to existing group</p>
        <ul>
          {groups.map((group, index) => (
            <li key={group ?? TODO_DEFAULT_GROUP} onClick={() => addTodo(group)}>
              {index === 9 ? "[0] " : index < 9 ? `[${index + 1}] ` : ""}
              {group ?? TODO_DEFAULT_GROUP}
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};
