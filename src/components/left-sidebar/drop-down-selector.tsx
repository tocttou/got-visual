import * as React from "react";
import Select from "antd/lib/select";
import { dropDownSelectorStyle } from "./styles";
const Option = Select.Option;

const DropDownSelector = props => {
  return (
    <Select
      defaultValue="marriedEngaged"
      mode={props.mode}
      disabled={props.dispatch || false}
      style={dropDownSelectorStyle}
      onChange={props.onChange}
    >
      <Option value="parents">Parents</Option>
      <Option value="parentOf">Parent Of</Option>
      <Option value="siblings">Siblings</Option>
      <Option value="marriedEngaged">Married/Engaged</Option>
      <Option value="killed">Killed</Option>
      <Option value="killedBy">Killed By</Option>
      <Option value="serves">Serves</Option>
      <Option value="servedBy">Served By</Option>
      <Option value="allies">Allies</Option>
      <Option value="abducted">Abducted</Option>
    </Select>
  );
};

export default DropDownSelector;
