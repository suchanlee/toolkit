import { editor, IDisposable } from "monaco-editor";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { MonacoSpaceGrayTheme } from "./MonacoSpaceGrayTheme";

require("./MonacoEditor.scss");

// add spacegray theme to monaco editor
editor.defineTheme("spacegray", MonacoSpaceGrayTheme);

export namespace MonacoEditor {
  export interface Props {
    fontSize?: number;
    value: string;
    onChange(value: string, event: editor.IModelContentChangedEvent): void;
  }
}

export class MonacoEditor extends React.PureComponent<MonacoEditor.Props> {
  private id = uuid();
  private editor: editor.IStandaloneCodeEditor | undefined;
  private subscription: IDisposable | undefined;

  public componentDidMount() {
    const element = document.getElementById(this.getId());
    if (element != null) {
      const monaco = editor.create(element, {
        value: this.props.value,
        minimap: {
          enabled: false
        },
        theme: "spacegray",
        fontSize: this.props.fontSize ?? 14
      });

      this.editor = monaco;
      this.subscription = monaco.onDidChangeModelContent(event => {
        this.props.onChange(monaco.getValue(), event);
      });
    }

    window.addEventListener("resize", this.handleResize);
  }

  public componentWillUnmount() {
    this.editor?.dispose();
    this.editor?.getModel()?.dispose();
    this.subscription?.dispose();

    window.removeEventListener("resize", this.handleResize);
  }

  public render() {
    return <div id={this.getId()} className="monaco-editor" />;
  }

  private handleResize = () => {
    this.editor?.layout();
  };

  private getId() {
    return `monaco-editor-${this.id}`;
  }
}
