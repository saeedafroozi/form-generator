import React from 'react';
import { FormMode, ControlType } from '../../constants/enum'
import { Control } from '../../constants/index'
import { Factory } from '../../constants/getComponent'
import { IBaseComponent } from '../../constants/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setValue, deleteControl, changeSwitch } from '../../actions/index'
import { WrapperCard } from '../design-/index'

interface FormRendererProps {
    setValue: (id: string, mode: FormMode, value: string, type: ControlType) => void;
    deleteControl?: (id: string) => void;
    changeSwitch?: (value: boolean, controlId: string) => void;
    mode: FormMode;
}

type FormRendererOnCreateArg = {
    validate?: () => PromiseLike<{ errors: any[], values: object }>;
    setFieldsValue?: (value: object) => void;
}
interface FormRendererState {
    structure: Control[];
}

const FormRenderer = ({ structure, mode, setValue, deleteControl, changeSwitch }: FormRendererProps & FormRendererState) => {

    const handleOnChange = (attribute: any, id: string, mode: FormMode, type: ControlType) => {
        setValue(id, mode, attribute, type)
    }
    return <React.Fragment>
        {
            mode === FormMode.Edit ? structure.map((Component) => {
                let instance = Factory.create(Component.type);
                let result = (instance as IBaseComponent).getComponent(mode, handleOnChange, Component.id, Component.attributes)
                return <WrapperCard key={Component.id} required={Component.required} controlId={Component.id} handleDelete={deleteControl} mode={mode} handleChangeSwitch={changeSwitch} type={Component.type} >
                    {result}
                </WrapperCard>
            })
                :
                <WrapperCard mode={mode} >
                    {structure.map((Component) => {
                        let instance = Factory.create(Component.type);
                        let result = (instance as IBaseComponent).getComponent(mode, handleOnChange, Component.id, Component.attributes)
                        return <div key={Component.id} className="form-view">
                            {result}
                        </div>
                    })}
                </WrapperCard>
        }
    </React.Fragment>
}

FormRenderer.Props = {
    mode: FormMode.Edit
}
function mapStateToProps(state: FormRendererState) {
    console.log(state);
    const { structure } = state
    return { structure };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setValue, deleteControl, changeSwitch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRenderer)
