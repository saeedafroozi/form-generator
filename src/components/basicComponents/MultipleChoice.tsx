import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ControlProps,MultipleChoice } from '../../constants/index';


interface WrapperMultipleChoiceProps extends ControlProps<MultipleChoice> {
    classes?: any;
}

const WrapperMultipleChoice = ({mode, onChange, id, attributes }:WrapperMultipleChoiceProps) => {
    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return <div>
        <FormControl component="fieldset" className="">
            <FormLabel component="legend" title={attributes.questionValue} onChange= />
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    </div>
}
export default WrapperMultipleChoice;