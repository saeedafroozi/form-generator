import { FormMode, ControlType, MultipleChoiceTypeEvent } from './enum'
export interface Component {
    // DataIndex?: string;
    //Label?: string;
    required?: boolean;
    attributes?: any;
    type: ControlType;
    // onChange?: (value: any) => void;//pak konam
    id: string;
    // Value?:string;
}
export interface Control {
    type: ControlType;
}

export interface ControlProps<T> {
    onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void;
    mode?: FormMode;
    id: string;
    attributes: T;
}
export interface MultipleChoiceAttributes {
    questionValue?: string;
    selectedAnswer?: string;
    questionOptions?: SelectValue[];
    type?: MultipleChoiceTypeEvent;
    optionId?: string;
    //questionOptionsCheckboxex?: CheckboxValue[];
}
// interface CheckboxValue {
//     id: string;
//     selected: boolean;
//     value:string;
// }

interface SelectValue {
    id: string;
    value: string;
    selected?:boolean;
}
export interface ShorAnswer {
    questionValue?: string;
    answerValue?: string;
}
export interface CheckboxAttribute {
    questionValue: string;
}
export interface IBaseComponent {
    changeHandler(oldValue, attributes);

    validate(): PromiseLike<{ errors: any[], values: object }>;

    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): any;
}
