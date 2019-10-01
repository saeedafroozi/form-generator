import React from 'react'
import TextField from '@material-ui/core/TextField'
import { DataTimeAttributes, ControlProps } from '../../constants/index'
import { FormMode, ControlType } from '../../constants/enum'
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
interface WrapperDateTimeProps extends ControlProps<DataTimeAttributes> {

}

const WrapperDateTime = ({ mode, onChange, id, attributes }: WrapperDateTimeProps) => {
    const handleOnchange = (e) => {
        console.log(e);
        let newAttributes: DataTimeAttributes;
        newAttributes = mode === FormMode.Edit ? { questionValue: e.target.value } :
            { answerValue: e.target.value }
        onChange(newAttributes, id, mode, ControlType.DateTimepicker)
    }
    let result;
    switch (mode) {
        case FormMode.View:
            result = <React.Fragment>
                {attributes && attributes.questionValue &&
                    <p className="form-label"
                        id={id + "question"}
                        key={id + "question"}
                    >{attributes ? attributes.questionValue : ""}</p>
                }
                <TextField
                    id={id}
                    label="DateTime"
                    className="date-time"
                    type="datetime-local"
                    value={attributes ? attributes.answerValue : ""}
                    onChange={handleOnchange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </React.Fragment>
            break
        case FormMode.Edit:
            result = <React.Fragment>
                <TextField
                    id={id}
                    key={id}
                    className="input"
                    value={attributes ? attributes.questionValue : ""}
                    placeholder="Question"
                    onChange={handleOnchange}
                    fullWidth
                />
                <TextField
                    id={id + "lable"}
                    disabled
                    placeholder="Day,month,year"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CalendarTodayIcon className="calendar-icon" />
                            </InputAdornment>
                        ),
                    }}
                />
            </React.Fragment>
            break
    }
    return result
}
export default WrapperDateTime;