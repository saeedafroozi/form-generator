
import * as React from 'react';
import { FormMode, ControlType } from '../../constants/enum';
import { ControlProps, TitleFormAttributes } from '../../constants/index'
import TextField from '@material-ui/core/TextField';
const uid = require('uuid/v1')



interface TextInputProps extends ControlProps<TitleFormAttributes> {
    classes?: any;
    multiline?: boolean;
}

const TitleForm = ({ mode, onChange, id, attributes }: TextInputProps) => {

    const handleOnchange = (e) => {
        let newAttributes: TitleFormAttributes;
        const value = e.target.value;
        newAttributes = e.taget.name === "title" ? { title: value, description: attributes.description } :
            { title: attributes.title, description: value }

        onChange(newAttributes, id, mode, ControlType.TitleForm)
    }
    let result = null;
    switch (mode) {
        case FormMode.View:
            result = <React.Fragment>
                {attributes && attributes.title &&
                    <p className="form-label"
                        id={uid()}
                        key={uid()}
                    >{attributes ? attributes.title : ""}</p>
                }
                {attributes && attributes.description &&
                    <p className="form-label"
                        id={uid()}
                        key={uid()}
                    >{attributes ? attributes.description : ""}</p>
                }
            </React.Fragment>
            break

        case FormMode.Edit:
            result = <React.Fragment>
                <TextField
                    id={uid()}
                    key={uid()}
                    name="title"
                    className="input"
                    value={attributes ? attributes.title : ""}
                    defaultValue="Untitled form"
                    placeholder="Form Title"
                    onChange={handleOnchange}
                    fullWidth
                />
                <TextField
                    id={uid()}
                    key={uid()}
                    name="description"
                    className="input"
                    value={attributes ? attributes.description : ""}
                    placeholder="Form Description"
                    onChange={handleOnchange}
                    fullWidth
                />
            </React.Fragment>
            break
    }
    return result
}
TitleForm.defaultProps = {
    mode: FormMode.Edit,
}
export default TitleForm;