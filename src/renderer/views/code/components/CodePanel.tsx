import { remote } from "electron";
import { IKeyboardEvent, KeyCode } from "monaco-editor";
import * as React from "react";
import { MonacoEditor } from "../../../shared-components/monaco/MonacoEditor";

export namespace CodePanel {
  export interface Props {}

  export interface State {
    value: string;
  }
}

export class CodePanel extends React.PureComponent<CodePanel.Props, CodePanel.State> {
  public state: CodePanel.State = {
    value: ""
  };

  public render() {
    return (
      <MonacoEditor
        value={this.state.value}
        language="javascript"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };

  private handleKeyUp = (evt: IKeyboardEvent) => {
    if (evt.keyCode === KeyCode.Enter && evt.altKey) {
      // in electron, creates a BrowserWindowProxy
      const browserWindow = new remote.BrowserWindow({
        // width: 300,
        // height: 300,
        // modal: true,
        show: false
        // webPreferences: {
        //   sandbox: true,
        // }
      });

      browserWindow.webContents.on("did-finish-load", () => {
        const output = browserWindow.webContents.executeJavaScript(this.state.value);
        output.then(value => {
          console.log("output", value);
          // browserWindow.close();
        });
      });

      // const browserWindow = window.open("", "modal") as any as BrowserWindowProxy;
      // const output: any = browserWindow.eval(this.state.value);

      // if (output != null) {
      //   console.log(output);
      // }
      // output.then(value => {
      //   console.log("output", value);
      //   browserWindow.close();
      // })
    }
  };
}
