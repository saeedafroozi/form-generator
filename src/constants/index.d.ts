interface Component {
    Code: string;
    DataIndex: string;
    Label: string;
    Required: boolean;
}
interface Control {
    Attributes?: any;
    Type: Chargoon.Library.Models.ExtraModel.ControlType;
}
export enum ControlType {
    ShortAnswer = 1,
    Paragraph = 2,
    MultipleChoice = 3,
    Checkboxes = 4,
    Dropdown = 5,
    FileUpload = 6,
    DateTimepicker = 7
}