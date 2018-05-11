import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
// tslint:disable-next-line
import { AppContainer } from "react-hot-loader";
import "./antd-css";

const rootEl = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require<{ default: typeof App }>("./App").default;
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <NextApp />
        </AppContainer>
      </Provider>,
      rootEl
    );
  });
}
