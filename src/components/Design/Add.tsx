import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { ControlType } from '../../constants/enum'
interface SelectProps {
  addControl: (e: any) => void;
  selected: number;
}
const Add = ({ addControl, selected }: SelectProps) => {

  const handleChange = (event: any) => {
    addControl(event);
  };

  return <div className="select">
    <InputLabel className="lable" htmlFor="component-simple">Select Your Control</InputLabel>
    <Select
      value={selected}
      onChange={handleChange}
      displayEmpty
      name="component"
      inputProps={{
        name: 'component',
        id: 'component-simple',
      }}
      className="control"
      variant='outlined'
    >

      <MenuItem className="select-item" value={ControlType.ShortAnswer}>ShortAnswer</MenuItem>
      <MenuItem className="select-item" value={ControlType.Paragraph}>Paragraph</MenuItem>
      <MenuItem className="select-item" value={ControlType.Checkboxes}>Checkboxes</MenuItem>
      <MenuItem className="select-item" value={ControlType.MultipleChoice}>MultipleChoice</MenuItem>
      <MenuItem className="select-item" value={ControlType.Dropdown}>Dropdown</MenuItem>
      <MenuItem className="select-item" value={ControlType.DateTimepicker}>DateTimepicker</MenuItem>
      <MenuItem className="select-item" value={ControlType.FileUpload}>FileUpload</MenuItem>
      <MenuItem className="select-item" value={ControlType.Custom}>Custom</MenuItem>
    </Select>
  </div>


}
export default Add;