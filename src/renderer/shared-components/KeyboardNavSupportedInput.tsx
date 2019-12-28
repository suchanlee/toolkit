import { Classes, HTMLInputProps } from "@blueprintjs/core";
import classnames from "classnames";
import * as React from "react";

export namespace KeyboardNavSupportedInput {
  export type Props = HTMLInputProps;
}

export class KeyboardNavSupportedInput extends React.PureComponent<
  KeyboardNavSupportedInput.Props
> {
  public render() {
    return (
      <input
        {...this.props}
        // mousetrap requires inputs and textareas to have the "mousetrap" class name for callbacks to be called
        className={classnames(Classes.INPUT, Classes.FILL, this.props.className, "mousetrap")}
      />
    );
  }
}
