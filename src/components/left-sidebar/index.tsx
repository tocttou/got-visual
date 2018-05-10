import * as React from "react";
import {
  sideBarContainerStyle,
  sidebarHeaderWrapper,
  sectionHeaderStyle
} from "./styles";
import GroupSelector from "./group-selector";
import RelationshipSelector from "./relationship-selector";
import FilterOutSelector from "./filter-out-selector";
import Checkboxes from "./checkboxes";
import Insights from "./insights";

export default class LeftSideBar extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div style={sideBarContainerStyle}>
        <div style={sidebarHeaderWrapper}>GOT VISUALIZER</div>
        {/*<SearchBox />*/}
        <div style={sectionHeaderStyle}>Group</div>
        <GroupSelector />
        <div style={sectionHeaderStyle}>Relationship</div>
        <RelationshipSelector />
        <div style={sectionHeaderStyle}>Filter Out</div>
        <FilterOutSelector />
        <Checkboxes />
        <div style={sectionHeaderStyle}>Insights</div>
        <Insights />
      </div>
    );
  }
}
