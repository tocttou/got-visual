import * as React from "react";
import { searchStyle } from "./styles";
import Input from "antd/lib/input";
import * as searchBoxActions from "../../actions/searchbox-actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IImmutableInitialState } from "../../reducers/initial-state";
const Search = Input.Search;

interface IDispatchProps {
  searchBoxActions: typeof searchBoxActions;
}

class SearchBox extends React.PureComponent<IDispatchProps, {}> {
  constructor(props) {
    super(props);
    this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
  }

  private onSearchBoxChange(value) {
    this.props.searchBoxActions.searchAndHighlightCharacter(value);
  }

  public render() {
    return (
      <div>
        <Search
          placeholder="Search for characters"
          onSearch={this.onSearchBoxChange}
          style={searchStyle}
        />
      </div>
    );
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    searchBoxActions: bindActionCreators(searchBoxActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
