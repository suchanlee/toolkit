import { Classes, HTMLInputProps } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";

export namespace KeyboardNavSupportedInput {
  export type Props = HTMLInputProps;
}

export class KeyboardNavSupportedInput extends React.PureComponent<
  KeyboardNavSupportedInput.Props
> {
  private ref = React.createRef<HTMLInputElement>();

  public render() {
    return (
      <input
        {...this.props}
        ref={this.ref}
        // mousetrap requires inputs and textareas to have the "mousetrap" class name for callbacks to be called
        className={classNames(Classes.INPUT, Classes.FILL, this.props.className, "mousetrap")}
      />
    );
  }

  public focus() {
    this.ref.current?.focus();
  }
}
