import { Button } from "@blueprintjs/core";
import React, { memo, useCallback, useState } from "react";
import { TodoGroupsDialog } from "./TodoGroupsDialog";

require("./TodoGroupsButton.scss");

export interface TodoGroupsButtonProps {
  setEscapeKeyCloseDisabled(isDisabled: boolean): void;
}

export const TodoGroupsButton = memo(({ setEscapeKeyCloseDisabled }: TodoGroupsButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleButtonClick = useCallback(() => {
    setIsOpen(true);
    setEscapeKeyCloseDisabled(true);
  }, [setEscapeKeyCloseDisabled, setIsOpen]);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    // need to make sure that esc doesn't close the whole panel by enabling it
    // too fast
    setTimeout(() => {
      setEscapeKeyCloseDisabled(false);
    }, 200);
  }, [setEscapeKeyCloseDisabled, setIsOpen]);

  return (
    <React.Fragment>
      <Button className="todo-groups-button" minimal={true} onClick={handleButtonClick}>
        Add/Manage Groups
      </Button>
      <TodoGroupsDialog isOpen={isOpen} onClose={handleClose} />
    </React.Fragment>
  );
});
