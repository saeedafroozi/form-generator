export enum ControlType {
    ShortAnswer = 1,
    Paragraph = 2,
    MultipleChoice = 3,
    Checkboxes = 4,
    Dropdown = 5,
    FileUpload = 6,
    DateTimepicker = 7,
    TitleForm = 8,
    Custom = 9
}
export enum FormMode {
    Edit = 1,
    View = 2
}
export enum MultipleChoiceTypeEvent {
    AddOption = 1,
    RemoveOption = 2,
    ChangeValueOption = 3,
    SelectRadioAnswer = 4,
    ChangeQuestionValue = 5,
    SelectCheckbox = 6
}
export enum MultiChoiceType {
    Dropdown = 1,
    Radio = 2,
    Checkbox = 3
}