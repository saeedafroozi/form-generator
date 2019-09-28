import * as React from 'react';
import { FormMode, ControlType } from '../../constants/enum';
import { ControlProps, ShorAnswer } from '../../constants/index'
import TextField from '@material-ui/core/TextField';
import { Card } from '../field/index'



interface TextInputProps extends ControlProps<ShorAnswer> {
    classes?: any;
    multiline?: boolean;
}

const TextInput = ({ multiline, mode, onChange, id, attributes }: TextInputProps) => {

    const handleOnchange = (e) => {
        let newAttributes: ShorAnswer;
        newAttributes = mode === FormMode.Edit ? { questionValue: e.target.value } :
            { answerValue: e.target.value }

        onChange(newAttributes, id, mode, multiline ? ControlType.Paragraph : ControlType.ShortAnswer)
    }
    let result = null;
    switch (mode) {
        case FormMode.View:
            result = [<TextField
                id={id + "question"}
                key={id + "question"}
                className="input disable"
                defaultValue={attributes ? attributes.questionValue : ""}
                fullWidth
                placeholder="Question"
                disabled
            />,
            <TextField
                id={id}
                key={id}
                className="input"
                value={attributes ? attributes.answerValue : ""}
                placeholder="Your Answer"
                fullWidth
                onChange={handleOnchange}
                multiline={multiline}
            />]
            break;

        case FormMode.Edit:
            result = [<TextField
                id={id}
                key={id}
                className="input"
                value={attributes ? attributes.questionValue : ""}
                placeholder="Question"
                onChange={handleOnchange}
                fullWidth
            />,
            <TextField
                id={id + "answer"}
                key={id + "answer"}
                className="input disable"
                defaultValue={""}
                placeholder="Your Answer"
                fullWidth={multiline}
                disabled
            />]
            break;

    }
    return <Card result={result} type={multiline ? ControlType.Paragraph : ControlType.ShortAnswer} />
}

TextInput.defaultProps = {
    mode: FormMode.Edit,
}
export default TextInput;