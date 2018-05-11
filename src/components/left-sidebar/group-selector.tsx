import * as React from "react";
import { dropDownSelectorStyle, searchStyle } from "./styles";
import Select from "antd/lib/select";
import { bindActionCreators, Dispatch } from "redux";
import { IImmutableInitialState } from "../../reducers/initial-state";
import * as groupActions from "../../actions/group-actions";
import * as commitActions from "../../actions/commit-actions";
import { connect } from "react-redux";
const Option = Select.Option;

interface IDispatchProps {
  groupActions: typeof groupActions;
  commitActions: typeof commitActions;
}

class GroupSelector extends React.PureComponent<IDispatchProps, {}> {
  constructor(props) {
    super(props);
    this.onGroupSelectorChange = this.onGroupSelectorChange.bind(this);
  }
  private onGroupSelectorChange(value) {
    this.props.groupActions.changeGrouping(value);
    this.props.commitActions.commitChanges();
  }

  public render() {
    return (
      <div>
        <Select
          defaultValue="none"
          style={dropDownSelectorStyle}
          onChange={this.onGroupSelectorChange}
        >
          <Option value="none">None</Option>
          <Option value="sex">Sex</Option>
          <Option value="houseName">House</Option>
        </Select>
      </div>
    );
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    groupActions: bindActionCreators(groupActions, dispatch),
    commitActions: bindActionCreators(commitActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);
