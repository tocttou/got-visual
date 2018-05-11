import * as React from "react";
import { dropDownSelectorStyle, searchStyle } from "./styles";
import TreeSelect from "antd/lib/tree-select";
import {
  IImmutableInitialState,
  IInitialState
} from "../../reducers/initial-state";
import { bindActionCreators, Dispatch } from "redux";
import * as filterOutActions from "../../actions/filter-out-actions";
import * as commitActions from "../../actions/commit-actions";
import { connect } from "react-redux";
import * as groupActions from "../../actions/group-actions";
const TreeNode = TreeSelect.TreeNode;

interface IDispatchProps {
  filterOutActions: typeof filterOutActions;
  commitActions: typeof commitActions;
  groupActions: typeof groupActions;
}

interface IProps {
  group: IInitialState["group"];
}

class FilterOutSelector extends React.PureComponent<IProps & IDispatchProps> {
  constructor(props) {
    super(props);
    this.onFilterSelectorChange = this.onFilterSelectorChange.bind(this);
  }
  private onFilterSelectorChange(value) {
    this.props.filterOutActions.changeFilterOut(value);
    this.props.groupActions.changeGrouping(this.props.group);
    this.props.commitActions.commitChanges();
  }

  public render() {
    return (
      <div>
        <TreeSelect
          placeholder="None"
          allowClear
          multiple
          treeDefaultExpandAll
          style={dropDownSelectorStyle}
          treeCheckable
          onChange={this.onFilterSelectorChange}
        >
          <TreeNode value="male" title="Male" key="0-1" />
          <TreeNode value="female" title="Female" key="0-2" />
          <TreeNode value="unknownsex" title="Unknown Sex" key="0-3" />
          <TreeNode value="royal" title="Royal" key="0-4" />
          <TreeNode value="kingsguard" title="Kingsguard" key="0-5" />
          <TreeNode value="house" title="Houses" key="0-6">
            <TreeNode value="stark" title="Stark" key="0-6-0" />
            <TreeNode value="targaryen" title="Targaryen" key="0-6-1" />
            <TreeNode value="baratheon" title="Baratheon" key="0-6-2" />
            <TreeNode value="lannister" title="Lannister" key="0-6-3" />
            <TreeNode value="greyjoy" title="Greyjoy" key="0-6-4" />
            <TreeNode value="tyrell" title="Tyrell" key="0-6-5" />
            <TreeNode value="martell" title="Martell" key="0-6-6" />
            <TreeNode value="frey" title="Frey" key="0-6-7" />
            <TreeNode value="tully" title="Tully" key="0-6-8" />
            <TreeNode value="commonfolk" title="Common Folk" key="0-6-9" />
          </TreeNode>
        </TreeSelect>
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
    filterOutActions: bindActionCreators(filterOutActions, dispatch),
    commitActions: bindActionCreators(commitActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterOutSelector);
