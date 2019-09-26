import React from 'react'
import Clear from '@material-ui/icons/Clear';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { ControlType } from '../../constants/enum';
interface WrapperCardProbs {
    result: React.Component<any>;
    type: ControlType;
}
export const WrapperCard = ({ result, type }: WrapperCardProbs) => {
    const [state, setState] = React.useState({
        checkedA: false,
    });
    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, checkedA: event.target.checked });
    };
    return <Card className="card" >
        <CardContent>
            {result}
        </CardContent>
        <CardActions className="action">
            <IconButton aria-label="delete" >
                <DeleteIcon className="deleteIcon" fontSize="large" />
            </IconButton>
            <div className="customDivider" />
            <FormControlLabel
                value="Required"
                control={<Switch
                    checked={state.checkedA}
                    onChange={handleChange('checked')}
                    value="checked"
                    color="primary"
                    size="medium"
                    className="switch"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Required"
                labelPlacement="start"
            />
        </CardActions>
    </Card>
}
export default WrapperCard;