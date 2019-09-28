import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ControlProps, MultipleChoiceAttributes } from '../../constants/index';
import { ControlType, MultipleChoiceTypeEvent } from '../../constants/enum';
import TextField from '@material-ui/core/TextField';
import { FormMode } from '../../constants/enum'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Card } from '../field/index';
import ClearIcon from '@material-ui/icons/Clear';
import Link from '@material-ui/core/Link';
import { uid } from 'uuid/v1'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';


interface WrapperMultipleChoiceProps extends ControlProps<MultipleChoiceAttributes> {
    classes?: any;
    multiChoice: boolean;
}

const WrapperMultipleChoice = ({ multiChoice, mode, onChange, id, attributes }: WrapperMultipleChoiceProps) => {

    const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAttributes: MultipleChoiceAttributes = {
            selectedAnswer: (event.target as HTMLInputElement).value,
            type: MultipleChoiceTypeEvent.selectRadioAnswer
        };
        handleLayoutChanges(newAttributes)
    };

    const handleQuestionValue = (event) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.changeQuestionValue, questionValue: (event.target as HTMLInputElement).value };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionRemove = (optionId: string) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.removeOption, optionId: optionId };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionAdd = (event) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.addOption };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionValue = (event, optionId) => {

        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.changeValueOption, questionOptions: [{ value: (event.target as HTMLInputElement).value, id: optionId }] };
        handleLayoutChanges(newAttributes)
    }
    const handleCheckbox = (event, checkboxId: string) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.selectCheckbox, questionOptions: [{ value: (event.target as HTMLInputElement).value, id: checkboxId, selected: (event.target as HTMLInputElement).checked }] };
        handleLayoutChanges(newAttributes)
    }
    const handleLayoutChanges = (newAttributes: MultipleChoiceAttributes) => {
        onChange(newAttributes, id, mode, multiChoice ? ControlType.Checkboxes : ControlType.MultipleChoice);
    }

    let result = null;
    switch (mode) {
        case FormMode.View:
            result = <React.Fragment><TextField
                id={id + "question"}
                key={id + "question"}
                className="input disable"
                defaultValue={attributes ? attributes.questionValue : ""}
                fullWidth
                placeholder="Question"
                disabled
            />
                {multiChoice ? attributes && (attributes.questionOptions || []).map((item, index) => {
                    return <div className="row checkbox-layout">
                        <FormControlLabel
                        className="lable"
                            control={
                                <Checkbox key={item.id} className="checkbox" checked={item.selected} onChange={(e) => handleCheckbox(e, item.id)} value={item.value} />
                            }
                            label={item.value}
                        />
                    </div>
                }) : <RadioGroup
                    aria-label="RadioGroup"
                    name="RadioGroup"
                    value={attributes ? attributes.selectedAnswer : ""}
                    onChange={handleSelectAnswer}>
                        {attributes && (attributes.questionOptions || []).map((item, index) => {
                            return <FormControlLabel  className="lable" key={item.id} value={item.value} control={<Radio className="radio" />} label={item.value} />;
                        })}
                    </RadioGroup>}
            </React.Fragment>
            break;

        case FormMode.Edit:
            result = <React.Fragment>
                <TextField
                    id={id}
                    key={id}
                    className="input"
                    value={attributes ? attributes.questionValue : ""}
                    placeholder="Question"
                    onChange={handleQuestionValue}
                    fullWidth
                />
                <div className="row">
                    {attributes && (attributes.questionOptions || []).map((item, index) => {
                        return <React.Fragment>
                            <div key={item.id}>
                                <div className="col-sm-1 circle">
                                    {multiChoice ? <CheckBoxOutlineBlankIcon fontSize='large' /> : <RadioButtonUncheckedIcon fontSize='large' />}
                                </div>
                                <div className="col-sm-10 circle-question">
                                    <TextField
                                        id={item.id}

                                        className="input"
                                        value={item.value}
                                        onChange={(e: any) => handleOptionValue(e, item.id)}
                                        fullWidth
                                    />
                                </div>
                                {attributes.questionOptions.length > 1 && <div className="col-sm-1 circle ">
                                    <ClearIcon fontSize='large' onClick={(e) => handleOptionRemove(item.id)} />
                                </div>}
                            </div>

                        </React.Fragment>
                    })}

                </div>

                <div className="row">
                    <div className="col-sm-1 circle">
                        {multiChoice ? <CheckBoxOutlineBlankIcon fontSize='large' /> : <RadioButtonUncheckedIcon fontSize='large' />}
                    </div>
                    <div className="col-sm-11 add-option">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleOptionAdd}
                            className="link"
                        >
                            Add Option
                    </Link>
                    </div>

                </div>
            </React.Fragment>
            break;
    }

    return <Card type={multiChoice ? ControlType.Checkboxes : ControlType.MultipleChoice} result={result} />
}
export default WrapperMultipleChoice;