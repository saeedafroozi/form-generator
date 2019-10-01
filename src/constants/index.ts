import { FormMode, ControlType, MultipleChoiceTypeEvent } from './enum'
export interface Control {
    required?: boolean;
    attributes?: any;
    type: ControlType;
    id: string;
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
}


interface SelectValue {
    id: string;
    value: string;
    selected?: boolean;
}
export interface ShorAnswer {
    questionValue?: string;
    answerValue?: string;
}
export interface DataTimeAttributes {
    questionValue?: string;
    answerValue?: string;
}
export interface CheckboxAttribute {
    questionValue: string;
}
export interface TitleFormAttributes {
    title: string;
    description: string;
}
export interface IBaseComponent {
    changeHandler(oldValue, attributes, formMode);

    validate(): PromiseLike<{ errors: any[], values: object }>;

    getComponent(mode: FormMode, onChange: (attributes: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): any;
}
