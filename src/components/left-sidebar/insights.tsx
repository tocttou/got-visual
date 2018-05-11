///<reference path="../../api/utils.ts"/>
import * as React from "react";
import Button from "antd/lib/button";
import {
  checkBoxStyle,
  explanationStyle,
  insightsButtonStyle,
  insightsTextStyle,
  sectionHeaderStyle
} from "./styles";
import {
  IImmutableInitialState,
  IInitialState
} from "../../reducers/initial-state";
import { connect } from "react-redux";
import DropDownSelector from "./drop-down-selector";
import {
  executeQuery,
  transformResponse3Way
} from "../../api/utils";
import * as networkActions from "../../actions/network-actions";
import { bindActionCreators, Dispatch } from "redux";

interface IProps {
  numActiveCharacters: IInitialState["numActiveCharacters"];
  numActiveRelationships: IInitialState["numActiveRelationships"];
}

interface IDispatchProps {
  networkActions: typeof networkActions;
}

interface IState {
  leftRelationship: string;
  rightRelationship: string;
}

class Insights extends React.PureComponent<IProps & IDispatchProps, IState> {
  public state = {
    leftRelationship: "marriedEngaged",
    rightRelationship: "marriedEngaged"
  };
  constructor(props) {
    super(props);
    this.handleInsights = this.handleInsights.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
    this.handleLeftRelationshipChange = this.handleLeftRelationshipChange.bind(
      this
    );
    this.handleRightRelationshipChange = this.handleRightRelationshipChange.bind(
      this
    );
  }

  private async handleInsights() {
    const query = this.buildQuery();
    const response = await executeQuery(query);
    const transformed = transformResponse3Way(response);
    this.props.networkActions.changeNetwork(transformed);
  }

  private buildQuery(): string {
    return `MATCH p=(u1:Character)-[r1:${
      this.state.leftRelationship
    }]->(u2:Character)-[r2:${
      this.state.rightRelationship
    }]->(u1) RETURN p, type(r1), type(r2)`;
  }

  private handleLeftRelationshipChange(value) {
    this.setState({ leftRelationship: value });
  }

  private handleRightRelationshipChange(value) {
    this.setState({ rightRelationship: value });
  }
  public render() {
    return (
      <div>
        <div style={sectionHeaderStyle}>
          <div style={checkBoxStyle}>Circular Relationship Insight</div>
          <div style={explanationStyle}>
            For any node u1 in the graph, the first relationship applies to any
            other node u2. The second relationship applies from u2 back to u1.
          </div>
        </div>
        <DropDownSelector
          mode={"default"}
          onChange={this.handleLeftRelationshipChange}
        />
        <DropDownSelector
          mode={"default"}
          onChange={this.handleRightRelationshipChange}
        />
        <Button style={insightsButtonStyle} onClick={this.handleInsights}>
          Show Insights
        </Button>
        <div style={insightsTextStyle}>
          Active characters: {this.props.numActiveCharacters || 0}
        </div>
        <div style={insightsTextStyle}>
          Active Relationships: {this.props.numActiveRelationships || 0}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {
    numActiveCharacters: state.get("numActiveCharacters"),
    numActiveRelationships: state.get("numActiveRelationships")
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    networkActions: bindActionCreators(networkActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Insights);
