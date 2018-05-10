import * as React from "react";
import Select from "antd/lib/select";
import * as relationshipActions from "../../actions/relationship-actions";
import * as groupActions from "../../actions/group-actions";
import { bindActionCreators, Dispatch } from "redux";
import {
  IImmutableInitialState,
  IInitialState
} from "../../reducers/initial-state";
import { connect } from "react-redux";
import DropDownSelector from "./drop-down-selector";

interface IDispatchProps {
  relationshipActions: typeof relationshipActions;
  groupActions: typeof groupActions;
}

interface IProps {
  group: IInitialState["group"];
}

class RelationshipSelector extends React.PureComponent<
  IProps & IDispatchProps,
  {}
> {
  constructor(props) {
    super(props);
    this.onRelationshipSelectorChange = this.onRelationshipSelectorChange.bind(
      this
    );
  }
  private onRelationshipSelectorChange(value) {
    this.props.relationshipActions.changeRelationship(value);
    setTimeout(() => {
      this.props.groupActions.changeGrouping(this.props.group);
    }, 500);
  }

  public render() {
    return (
      <div>
        <DropDownSelector
          mode={"multiple"}
          onChange={this.onRelationshipSelectorChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {
    group: state.get("group")
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    relationshipActions: bindActionCreators(relationshipActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  RelationshipSelector
);
