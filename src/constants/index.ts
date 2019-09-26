import { FormMode, ControlType } from './enum'
export interface Component {
    // DataIndex?: string;
    //Label?: string;
    Required?: boolean;
    Attributes?: any;
    Type: ControlType;
    onChange?: (value: any) => void;//pak konam
    Id: string;
    // Value?:string;
}
export interface Control {
    Type: ControlType;
}

export interface ControlProps<T> {
    onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void;
    mode?: FormMode;
    id: string;
    attributes: T;
}
export interface MultipleChoice {
    questionValue: string;
    selectedAnswer: number;
    questionOptions: Array<string>;
}
export interface ShorAnswer {
    questionValue: string;
    answerValue: string;
}
export interface CheckboxAttribute {
    questionValue: string;
}
export interface IBaseComponent {

    validate(): PromiseLike<{ errors: any[], values: object }>;

    getComponent(mode: FormMode, onChange: (e: any, id: string, mode: FormMode, type: ControlType) => void, id: string, attributes?: any): any;
}
