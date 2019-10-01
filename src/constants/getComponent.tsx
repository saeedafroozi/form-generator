import React from 'react';
import TextInput from '../components/basicComponents/TextInput';
import WrapperMultipleChoice from '../components/basicComponents/MultipleChoice'
import WrapperDateTime from '../../src/components/basicComponents/DateTimePicker'
import { ControlType, FormMode, MultipleChoiceTypeEvent, MultiChoiceType } from '../constants/enum'
import { IBaseComponent, ShorAnswer, MultipleChoiceAttributes, DataTimeAttributes } from '../constants/index'
const uid = require('uuid/v1')




class ShortAnswer implements IBaseComponent {

    changeHandler(oldValue, attributes: ShorAnswer, formMode: FormMode) {
        const obj = { ...oldValue };
        let newAttributes = { ...obj.attributes }

        if (formMode === FormMode.Edit) {
            if (obj.attributes && obj.attributes.questionValue) {
                newAttributes.questionValue = attributes.questionValue;
            }
            else {
                newAttributes = { questionValue: attributes.questionValue }
            }
        }
        else {
            if (obj.attributes && obj.attributes.answerValue) {
                newAttributes.answerValue = attributes.answerValue;
            }
            else {
                newAttributes = { answerValue: attributes.answerValue, questionValue: newAttributes.questionValue }
            }
        }
        obj.attributes = newAttributes;
        return obj;
    }
    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: ShorAnswer, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <TextInput key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class Paragraph implements IBaseComponent {
    changeHandler(oldValue, attributes: ShorAnswer, formMode: FormMode) {
        const obj = { ...oldValue };
        let newAttributes = { ...obj.attributes }

        if (formMode === FormMode.Edit) {
            if (obj.attributes && obj.attributes.questionValue) {
                newAttributes.questionValue = attributes.questionValue;
            }
            else {
                newAttributes = { questionValue: attributes.questionValue }
            }
        }
        else {
            if (obj.attributes && obj.attributes.answerValue) {
                newAttributes.answerValue = attributes.answerValue;
            }
            else {
                newAttributes = { answerValue: attributes.answerValue, questionValue: newAttributes.questionValue }
            }
        }
        obj.attributes = newAttributes;
        return obj;
    }

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <TextInput multiline={true} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class CheckboxInput implements IBaseComponent {
    changeHandler(oldValue, attributes: MultipleChoiceAttributes, formMode: FormMode) {
        const obj = { ...oldValue };
        if (attributes.type === MultipleChoiceTypeEvent.SelectCheckbox) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.questionOptions[0].id);
            const option = { ...options[index] };
            option.selected = attributes.questionOptions[0].selected;
            obj.attributes.questionOptions[index] = option;
        }
        //add options
        else if (attributes.type === MultipleChoiceTypeEvent.AddOption) {
            const options = [...obj.attributes.questionOptions];
            options.push({ id: uid(), value: "Option" + (options.length + 1), selected: false })
            obj.attributes.questionOptions = options;
        }
        //remove Options
        else if (attributes.type === MultipleChoiceTypeEvent.RemoveOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.optionId)
            options.splice(index, 1);
            obj.attributes.questionOptions = options;
        }
        //questionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeQuestionValue) {
            obj.attributes.questionValue = attributes.questionValue;
        }
        //optionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeValueOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.questionOptions[0].id);
            const option = { ...options[index] };
            option.value = attributes.questionOptions[0].value;
            obj.attributes.questionOptions[index] = option;
        }
        return obj;
    }

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <WrapperMultipleChoice multiChoiceType={MultiChoiceType.Checkbox} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class MultipleChoice implements IBaseComponent {

    changeHandler(oldValue, attributes: MultipleChoiceAttributes, formMode: FormMode) {
        const obj = { ...oldValue };
        //select answer
        if (attributes.type === MultipleChoiceTypeEvent.SelectRadioAnswer) {
            obj.attributes.selectedAnswer = attributes.selectedAnswer;
        }
        //add options
        else if (attributes.type === MultipleChoiceTypeEvent.AddOption) {
            const options = [...obj.attributes.questionOptions];
            options.push({ id: uid(), value: "Option" + (options.length + 1) })
            obj.attributes.questionOptions = options;
        }
        //remove Options
        else if (attributes.type === MultipleChoiceTypeEvent.RemoveOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.optionId)
            options.splice(index, 1);
            obj.attributes.questionOptions = options;
        }
        //questionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeQuestionValue) {

            obj.attributes.questionValue = attributes.questionValue;
        }
        //optionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeValueOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.questionOptions[0].id);
            const option = { ...options[index] };
            option.value = attributes.questionOptions[0].value;
            obj.attributes.questionOptions[index] = option;
        }
        return obj;
    }

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <WrapperMultipleChoice multiChoiceType={MultiChoiceType.Radio} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class DropDown implements IBaseComponent {

    changeHandler(oldValue, attributes: MultipleChoiceAttributes, formMode: FormMode) {
        const obj = { ...oldValue };
        //select answer
        if (attributes.type === MultipleChoiceTypeEvent.SelectRadioAnswer) {
            obj.attributes.selectedAnswer = attributes.selectedAnswer;
        }
        //add options
        else if (attributes.type === MultipleChoiceTypeEvent.AddOption) {
            const options = [...obj.attributes.questionOptions];
            options.push({ id: uid(), value: "Option" + (options.length + 1) })
            obj.attributes.questionOptions = options;
        }
        //remove Options
        else if (attributes.type === MultipleChoiceTypeEvent.RemoveOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.optionId)
            options.splice(index, 1);
            obj.attributes.questionOptions = options;
        }
        //questionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeQuestionValue) {

            obj.attributes.questionValue = attributes.questionValue;
        }
        //optionValue
        else if (attributes.type === MultipleChoiceTypeEvent.ChangeValueOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.questionOptions[0].id);
            const option = { ...options[index] };
            option.value = attributes.questionOptions[0].value;
            obj.attributes.questionOptions[index] = option;
        }
        return obj;
    }

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <WrapperMultipleChoice multiChoiceType={MultiChoiceType.Dropdown} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class DataTime implements IBaseComponent {

    changeHandler(oldValue, attributes: DataTimeAttributes, formMode: FormMode) {
        const obj = { ...oldValue };
        let newAttributes = { ...obj.attributes }

        if (formMode === FormMode.Edit) {
            if (obj.attributes && obj.attributes.questionValue) {
                newAttributes.questionValue = attributes.questionValue;
            }
            else {
                newAttributes = { questionValue: attributes.questionValue }
            }
        }
        else {
            if (obj.attributes && obj.attributes.answerValue) {
                newAttributes.answerValue = attributes.answerValue;
            }
            else {
                newAttributes = { answerValue: attributes.answerValue, questionValue: newAttributes.questionValue }
            }
        }
        obj.attributes = newAttributes;
        return obj;
    }
    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (attributes: DataTimeAttributes, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <WrapperDateTime key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
export class Factory {
    public static create(type: ControlType) {
        let result = null;
        switch (type) {
            case ControlType.Checkboxes:
                result = new CheckboxInput();
                break;
            case ControlType.ShortAnswer:
                result = new ShortAnswer();
                break;
            case ControlType.Paragraph:
                result = new Paragraph();
                break;
            case ControlType.MultipleChoice:
                result = new MultipleChoice();
                break;
            case ControlType.Dropdown:
                result = new DropDown();
                break;
            case ControlType.DateTimepicker:
                result = new DataTime();
                break;
        }
        return result;
    }
}


