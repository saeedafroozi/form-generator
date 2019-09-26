import * as React from 'react';
import { FormMode } from '../../constants/enum';
import { ControlProps,CheckboxAttribute } from '../../constants/index'



interface CheckboxProps extends ControlProps<CheckboxAttribute> {
    type?: string
}

const Checkbox = ({ mode, onChange, type }: CheckboxProps) => {
    return <React.Fragment>
        {/* {renderComponent(mode, type, onChange)} */}
    </React.Fragment>

}
const renderComponent = (mode?: FormMode, type?: string, value?: boolean, onChange?: any) => {
    switch (mode) {
        case FormMode.View:
            return <input type={type} checked={value} />
        case FormMode.Edit:
            return <input type={type} checked={value} onChange={(e) => onChange((e.target as any).value)} />
    }
}
Checkbox.defaultProps = {
    mode: FormMode.Edit,
    type: 'chekbox',
    value: true,
}
export default Checkbox;