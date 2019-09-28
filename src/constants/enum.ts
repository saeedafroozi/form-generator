export enum ControlType {
    ShortAnswer = 1,
    Paragraph = 2,
    MultipleChoice = 3,
    Checkboxes = 4,
    Dropdown = 5,
    FileUpload = 6,
    DateTimepicker = 7,
    Custom = 8
}
export enum FormMode {
    Edit = 1,
    View = 2
}
export enum MultipleChoiceTypeEvent {
    addOption = 1,
    removeOption = 2,
    changeValueOption = 3,
    selectRadioAnswer = 4,
    changeQuestionValue = 5,
    selectCheckbox = 6
}