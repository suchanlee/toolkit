import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import { Application } from "./components/Application";
import { KeyboardShortcuts } from "./components/keyboard/KeyboardShortcuts";
import { store } from "./store/store";

require("./app.scss");

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <React.Fragment>
        <KeyboardShortcuts />
        {/* <FloatingMenu /> disable for now */}
        <Application />
      </React.Fragment>
    </Provider>
  </AppContainer>,
  mainElement
);
