import React from 'react';
import Checkbox from '../components/basicComponents/Checkbox';
import TextInput from '../components/basicComponents/TextInput';
import WrapperMultipleChoice from '../components/basicComponents/MultipleChoice'
import { ControlType, FormMode } from '../constants/enum'
import { IBaseComponent } from '../constants/index'



class CheckboxInput implements IBaseComponent {

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <Checkbox mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class ShortAnswer implements IBaseComponent {

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <TextInput key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class Paragraph implements IBaseComponent {

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <TextInput multiline={true} key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
    }
}
class MultipleChoice implements IBaseComponent {

    validate(): PromiseLike<{ errors: any[], values: object }> {
        return new Promise<{ errors: any[], values: object }>(executor => {
            executor();
        });
    }
    getComponent(mode: FormMode, onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): React.ReactNode {

        return <WrapperMultipleChoice  key={id} mode={mode} onChange={onChange} id={id} attributes={attributes} />
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
