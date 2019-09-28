import React from 'react';
import TextInput from '../components/basicComponents/TextInput';
import WrapperMultipleChoice from '../components/basicComponents/MultipleChoice'
import { ControlType, FormMode, MultipleChoiceTypeEvent } from '../constants/enum'
import { IBaseComponent, ShorAnswer, MultipleChoiceAttributes } from '../constants/index'
const uid = require('uuid/v1')




class ShortAnswer implements IBaseComponent {

    changeHandler(oldValue, attributes: ShorAnswer) {
        const obj = { ...oldValue };
        if (obj.attributes && obj.attributes.questionValue) {
            obj.attributes.questionValue = attributes.questionValue;
        }
        else {
            obj.attributes = { questionValue: attributes.questionValue }
        }
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
    changeHandler(oldValue, attributes: ShorAnswer) {
        const obj = { ...oldValue };
        if (obj.attributes && obj.attributes.questionValue) {
            obj.attributes.questionValue = attributes.questionValue;
        }
        else {
            obj.attributes = { questionValue: attributes.questionValue }
        }
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
    changeHandler(oldValue, attributes: MultipleChoiceAttributes) {
        const obj = { ...oldValue };
        if (attributes.type === MultipleChoiceTypeEvent.selectCheckbox) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id == attributes.questionOptions[0].id);
            const option = { ...options[index] };
            option.selected = attributes.questionOptions[0].selected;
            obj.attributes.questionOptions[index] = option;
        }
        //add options
        else if (attributes.type === MultipleChoiceTypeEvent.addOption) {
            const options = [...obj.attributes.questionOptions];
            options.push({ id: uid(), value: "Option" + (options.length + 1), selected: false })
            obj.attributes.questionOptions = options;
        }
        //remove Options
        else if (attributes.type === MultipleChoiceTypeEvent.removeOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.optionId)
            options.splice(index, 1);
            obj.attributes.questionOptions = options;
        }
        //questionValue
        else if (attributes.type === MultipleChoiceTypeEvent.changeQuestionValue) {
            obj.attributes.questionValue = attributes.questionValue;
        }
        //optionValue
        else if (attributes.type === MultipleChoiceTypeEvent.changeValueOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id == attributes.questionOptions[0].id);
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

        return <WrapperMultipleChoice multiChoice={true} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class MultipleChoice implements IBaseComponent {

    changeHandler(oldValue, attributes: MultipleChoiceAttributes) {
        const obj = { ...oldValue };
        //select answer
        if (attributes.type === MultipleChoiceTypeEvent.selectRadioAnswer) {
            obj.attributes.selectedAnswer = attributes.selectedAnswer;
        }
        //add options
        else if (attributes.type === MultipleChoiceTypeEvent.addOption) {
            const options = [...obj.attributes.questionOptions];
            options.push({ id: uid(), value: "Option" + (options.length + 1) })
            obj.attributes.questionOptions = options;
        }
        //remove Options
        else if (attributes.type === MultipleChoiceTypeEvent.removeOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id === attributes.optionId)
            options.splice(index, 1);
            obj.attributes.questionOptions = options;
        }
        //questionValue
        else if (attributes.type === MultipleChoiceTypeEvent.changeQuestionValue) {

            obj.attributes.questionValue = attributes.questionValue;
        }
        //optionValue
        else if (attributes.type === MultipleChoiceTypeEvent.changeValueOption) {
            const options = [...obj.attributes.questionOptions];
            const index = options.findIndex(x => x.id == attributes.questionOptions[0].id);
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

        return <WrapperMultipleChoice multiChoice={false} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
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
        }
        return result;
    }
}



// export function getDesiredValidationRules(controlCode: string, required: boolean, incommingRules: any[]) {
//     const rules = [];

//     switch (controlCode) {
//         case ControlsCode.EmailCode.toString():
//             rules.push({
//                 type: 'email'
//             });
//             break;
//         case ControlsCode.BooleanCode.toString():
//             rules.push({
//                 type: 'boolean'
//             });
//             break;
//         case ControlsCode.DateCode.toString():
//         case ControlsCode.DateTimeCode.toString():
//             //rules.push({
//             //	type: 'date'
//             //});
//             break;
//         case ControlsCode.UrlCode.toString():
//             rules.push({
//                 type: 'url'
//             });
//             break;
//         case ControlsCode.UniqueidentifierCode.toString():
//             rules.push({
//                 pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
//             });
//             break;
//     }

//     if (required) {
//         rules.push({
//             required: true
//         });
//     }

//     if (!!incommingRules && incommingRules.length) {
//         rules.push(...incommingRules);
//     }

//     return rules;
// }

// export function getComponent(component: Component, controlFactory: (component: Component) => React.ReactNode) {
//     let extraModelComponent = null;
//     switch (component.Code) {
//         case ControlsCode.IntCode.toString():
//             extraModelComponent = <IntType />;
//             break;
//         case ControlsCode.BigDecimalCode.toString():
//             extraModelComponent = <BigDecimalType />;
//             break;
//         case ControlsCode.DecimalCode.toString():
//             extraModelComponent = <DecimalType />;
//             break;
//         case ControlsCode.TextCode.toString():
//             extraModelComponent = <TextType />;
//             break;
//         case ControlsCode.EmailCode.toString():
//             extraModelComponent = <EmailType />;
//             break;
//         case ControlsCode.BooleanCode.toString():
//             extraModelComponent = <BooleanType />;
//             break;
//         case ControlsCode.DateCode.toString():
//             extraModelComponent = <DateType />;
//             break;
//         case ControlsCode.DateTimeCode.toString():
//             extraModelComponent = <DateTimeType />;
//             break;
//         case ControlsCode.MultiSelectCode.toString():
//             extraModelComponent = <MultiSelectType multiSelectDataSource={ component.Attributes } />;
//             break;
//         case ControlsCode.UniqueidentifierCode.toString():
//             extraModelComponent = <UniqueidentifierType />;
//             break;
//         case ControlsCode.AutoIncrementCode.toString():
//             extraModelComponent = <AutoIncrementType />;
//             break;
//         case ControlsCode.GenderCode.toString():
//             extraModelComponent = <GenderType />;
//             break;
//         case ControlsCode.ImageCode.toString():
//             extraModelComponent = <ImageType />;
//             break;
//         case ControlsCode.FileCode.toString():
//             extraModelComponent = <FileType />;
//             break;
//         case ControlsCode.StringCode.toString():
//             extraModelComponent = <StringType />;
//             break;
//         case ControlsCode.TelCode.toString():
//             extraModelComponent = <TelType />;
//             break;
//         case ControlsCode.TimeCode.toString():
//             extraModelComponent = <TimeType />;
//             break;
//         case ControlsCode.UrlCode.toString():
//             extraModelComponent = <UrlType />;
//             break;
//         case ControlsCode.GridCode.toString():
//             extraModelComponent = <GridType { ...component.Attributes } />;
//             break;
//         case ControlsCode.InsertTimeStampCode.toString():
//             extraModelComponent = <InsertTimeStamp />;
//             break;
//         case ControlsCode.DidgahStaffCode.toString():
//             extraModelComponent = <DidgahStaffType />;
//             break;
//         case ControlsCode.DidgahContactCode.toString():
//             extraModelComponent = <DidgahContactType />;
//             break;
//         default:
//             extraModelComponent = controlFactory(component);
//             break;
//     }
//     return extraModelComponent;
// }
