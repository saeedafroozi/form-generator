import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ControlType, FormMode } from '../../constants/enum';
interface WrapperCardProbs {
    children?: any;
    type?: ControlType;
    mode: FormMode;
    handleDelete?: (id: string) => void;
    controlId?: string;
    handleChangeSwitch?: (value: boolean, controlId: string) => void;
    required?: boolean;
}
export const WrapperCard = ({ type, mode, children, handleDelete, controlId, handleChangeSwitch, required }: WrapperCardProbs) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeSwitch(event.target.checked, controlId);
    }
    return <Card className="card" >
        <CardContent>
            {children}
        </CardContent>
        {mode === FormMode.Edit && <CardActions className="action">
            <IconButton aria-label="delete" >
                <DeleteIcon onClick={() => handleDelete(controlId)} className="deleteIcon" fontSize="large" />
            </IconButton>
            <div className="customDivider" />
            <FormControlLabel
                value="Required"
                control={<Switch
                    checked={required}
                    onChange={handleChange}
                    value="checked"
                    color="primary"
                    size="medium"
                    className="switch"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Required"
                labelPlacement="start"
            />
        </CardActions>}
    </Card>

}
export default WrapperCard;