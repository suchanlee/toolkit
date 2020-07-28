import { Button } from "@blueprintjs/core";
import React, { memo, useState } from "react";
import { TodoGroupsDialog } from "./TodoGroupsDialog";

require("./TodoGroupsButton.scss");

export interface TodoGroupsButtonProps {}

export const TodoGroupsButton = memo(({}: TodoGroupsButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Button className="todo-groups-button" minimal={true} onClick={() => setIsOpen(true)}>
        Add/Manage Groups
      </Button>
      <TodoGroupsDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </React.Fragment>
  );
});
