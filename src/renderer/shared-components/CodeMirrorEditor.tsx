import classNames from "classnames";
import CodeMirror from "codemirror";
import * as React from "react";

import "codemirror/lib/codemirror.css";
import "./base16-ocean-dark.scss";
import "./CodeMirrorEditor.scss";

// no mode yet
// import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/selection/active-line.js";

export namespace CodeMirrorEditor {
  export interface Props {
    className?: string;
    onChange(value: string): void;
    onKeyDown?(event: KeyboardEvent): void;
  }
}

type ExtendedCodeMirrorConfiguration = CodeMirror.EditorConfiguration & {
  styleActiveLine: boolean;
  autoCloseBrackets: boolean;
};

export class CodeMirrorEditor extends React.PureComponent<CodeMirrorEditor.Props> {
  private divRef = React.createRef<HTMLDivElement>();
  private codeMirror!: CodeMirror.Editor;

  public componentDidMount() {
    if (this.divRef.current != null) {
      const configurations: ExtendedCodeMirrorConfiguration = {
        autofocus: true,
        tabSize: 2,
        lineNumbers: true,
        theme: "base16-ocean-dark",
        styleActiveLine: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        mode: ""
        // no modes for now
        // mode: {
        //   name: "javascript",
        //   typescript: true
        // }
      };

      const codeMirror = CodeMirror(this.divRef.current, configurations);
      this.codeMirror = codeMirror;

      codeMirror.on("changes", editor => {
        this.props.onChange(editor.getValue());
      });

      if (this.props.onKeyDown != null) {
        codeMirror.on("keydown", (_editor, event) => {
          this.props.onKeyDown!(event);
        });
      }
    }
  }

  public render() {
    return (
      <div className={classNames("code-mirror-editor", this.props.className)} ref={this.divRef} />
    );
  }

  // imperatively setting the editor value for performance reasons
  public setValue(value: string) {
    this.codeMirror?.setValue(value);
  }
}
