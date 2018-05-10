import * as React from "react";
import { dropDownSelectorStyle, searchStyle } from "./styles";
import Select from "antd/lib/select";
import { bindActionCreators, Dispatch } from "redux";
import { IImmutableInitialState } from "../../reducers/initial-state";
import * as groupActions from "../../actions/group-actions";
import { connect } from "react-redux";
const Option = Select.Option;

interface IDispatchProps {
  groupActions: typeof groupActions;
}

class GroupSelector extends React.PureComponent<IDispatchProps, {}> {
  constructor(props) {
    super(props);
    this.onGroupSelectorChange = this.onGroupSelectorChange.bind(this);
  }
  private onGroupSelectorChange(value) {
    this.props.groupActions.changeGrouping(value);
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
    groupActions: bindActionCreators(groupActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);
