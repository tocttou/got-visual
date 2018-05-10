import * as React from "react";
import LeftSideBar from "./components/left-sidebar";
import Network from "./components/network";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <React.Fragment>
        <LeftSideBar />
        <Network />
      </React.Fragment>
    );
  }
}
