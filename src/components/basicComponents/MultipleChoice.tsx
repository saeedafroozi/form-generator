import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ControlProps, MultipleChoiceAttributes } from '../../constants/index';
import { ControlType, MultipleChoiceTypeEvent, MultiChoiceType } from '../../constants/enum';
import TextField from '@material-ui/core/TextField';
import { FormMode } from '../../constants/enum'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import Link from '@material-ui/core/Link';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
const uid = require('uuid/v1')



interface WrapperMultipleChoiceProps extends ControlProps<MultipleChoiceAttributes> {
    classes?: any;
    multiChoiceType: MultiChoiceType;

}

const WrapperMultipleChoice = ({ multiChoiceType, mode, onChange, id, attributes }: WrapperMultipleChoiceProps) => {

    const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAttributes: MultipleChoiceAttributes = {
            selectedAnswer: (event.target as HTMLInputElement).value,
            type: MultipleChoiceTypeEvent.SelectRadioAnswer
        }
        handleLayoutChanges(newAttributes)
    }

    const handleQuestionValue = (event) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.ChangeQuestionValue, questionValue: (event.target as HTMLInputElement).value };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionRemove = (optionId: string) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.RemoveOption, optionId: optionId };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionAdd = (event) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.AddOption };
        handleLayoutChanges(newAttributes)
    }
    const handleOptionValue = (event, optionId) => {

        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.ChangeValueOption, questionOptions: [{ value: (event.target as HTMLInputElement).value, id: optionId }] };
        handleLayoutChanges(newAttributes)
    }
    const handleCheckbox = (event, checkboxId: string) => {
        const newAttributes: MultipleChoiceAttributes = { type: MultipleChoiceTypeEvent.SelectCheckbox, questionOptions: [{ value: (event.target as HTMLInputElement).value, id: checkboxId, selected: (event.target as HTMLInputElement).checked }] };
        handleLayoutChanges(newAttributes)
    }
    const handleLayoutChanges = (newAttributes: MultipleChoiceAttributes) => {
        onChange(newAttributes, id, mode, multiChoiceType === MultiChoiceType.Checkbox ? ControlType.Checkboxes : multiChoiceType === MultiChoiceType.Radio ? ControlType.MultipleChoice : ControlType.Dropdown);
    }
    const chooseCorectComponent = () => {
        let result
        switch (multiChoiceType) {
            case MultiChoiceType.Checkbox:
                result = attributes && (attributes.questionOptions || []).map((item, index) => {
                    return <div className="row checkbox-layout" key={item.id}>
                        <FormControlLabel

                            className="lable"
                            control={<Checkbox key={item.id} className="checkbox" checked={item.selected} onChange={(e) => handleCheckbox(e, item.id)} value={item.value} />}
                            label={item.value}
                        />
                    </div>
                })
                break
            case MultiChoiceType.Radio:
                result = <RadioGroup

                    aria-label="RadioGroup"
                    name="RadioGroup"
                    value={attributes ? attributes.selectedAnswer : ""}
                    onChange={handleSelectAnswer}>
                    {attributes && (attributes.questionOptions || []).map((item, index) => {
                        return <FormControlLabel className="lable" key={item.id} value={item.value} control={<Radio className="radio" />} label={item.value} />
                    })}
                </RadioGroup>
                break
            case MultiChoiceType.Dropdown:
                result = <div>
                    <InputLabel className="lable" htmlFor="component-simple">Select Your Control</InputLabel>
                    <Select

                        value={attributes.selectedAnswer}
                        onChange={handleSelectAnswer}
                        displayEmpty
                        name="component"
                        inputProps={{
                            name: 'component',
                            id: 'component-simple',
                        }}
                        className="control"
                        variant='outlined'
                    >
                        {attributes.questionOptions.map((item, index) => {
                            return <MenuItem key={item.id} className="select-item" value={item.value}>{item.value}</MenuItem>
                        })}
                    </Select>
                </div>
                break
        }
        return result
    }

    let result = null
    switch (mode) {
        case FormMode.View:
            result = <React.Fragment>
                {attributes && attributes.questionValue &&
                    <p className="form-label"
                        id={id + "question"}
                        key={id + "question"}
                    >{attributes ? attributes.questionValue : ""}</p>
                }
                {chooseCorectComponent()}
            </React.Fragment>
            break

        case FormMode.Edit:
            result = <React.Fragment>
                <TextField
                    id={id}

                    className="input"
                    value={attributes ? attributes.questionValue : ""}
                    placeholder="Question"
                    onChange={handleQuestionValue}
                    fullWidth
                />
                <div className="row">
                    {attributes && (attributes.questionOptions || []).map((item, index) => {
                        return (
                            <div key={item.id}>
                                <div className="col-sm-1 circle">
                                    {multiChoiceType === MultiChoiceType.Checkbox ? <CheckBoxOutlineBlankIcon fontSize='large' /> : multiChoiceType === MultiChoiceType.Radio ? <RadioButtonUncheckedIcon fontSize='large' /> : null}
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
                        )

                    })}

                </div>

                <div className="row">
                    <div className="col-sm-1 circle">
                        {multiChoiceType === MultiChoiceType.Checkbox ? <CheckBoxOutlineBlankIcon key={uid()} fontSize='large' /> : multiChoiceType === MultiChoiceType.Radio ? <RadioButtonUncheckedIcon key={uid()} fontSize='large' /> : null}
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
            break
    }
    return result
}
export default WrapperMultipleChoice;