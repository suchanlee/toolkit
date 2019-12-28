import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import { Application } from "./components/Application";
import { store } from "./store/store";

require("./app.scss");

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mainElement
  );
};

render(Application);
