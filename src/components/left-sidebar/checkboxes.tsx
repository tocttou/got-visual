import * as React from "react";
import { checkBoxStyle, sectionHeaderStyle } from "./styles";
import Checkbox from "antd/lib/checkbox";
import { IImmutableInitialState } from "../../reducers/initial-state";
import { bindActionCreators, Dispatch } from "redux";
import * as clusterOutliersActions from "../../actions/cluster-outliers-actions";
import * as hideNamesActions from "../../actions/hide-names-actions";
import { connect } from "react-redux";

interface IDispatchProps {
  clusterOutliersActions: typeof clusterOutliersActions;
  hideNamesActions: typeof hideNamesActions;
}

class Checkboxes extends React.PureComponent<IDispatchProps, {}> {
  constructor(props) {
    super(props);
    this.onClusterOutlierChange = this.onClusterOutlierChange.bind(this);
    // this.onHideNamesChange = this.onHideNamesChange.bind(this);
  }
  private onClusterOutlierChange(e) {
    this.props.clusterOutliersActions.toggleClusterOutliers(e.target.checked);
  }

  // private onHideNamesChange(e) {
  //   this.props.hideNamesActions.toggleHideNames(e.target.checked);
  // }

  public render() {
    return (
      <React.Fragment>
        <div style={sectionHeaderStyle}>
          <Checkbox
            style={checkBoxStyle}
            onChange={this.onClusterOutlierChange}
          >
            Cluster outliers
          </Checkbox>
        </div>
        {/*
        Disabled
        */}
        {/*<div style={sectionHeaderStyle}>*/}
        {/*<Checkbox style={checkBoxStyle} onChange={this.onHideNamesChange}>*/}
        {/*Hide names*/}
        {/*</Checkbox>*/}
        {/*</div>*/}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    clusterOutliersActions: bindActionCreators(
      clusterOutliersActions,
      dispatch
    ),
    hideNamesActions: bindActionCreators(hideNamesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkboxes);
