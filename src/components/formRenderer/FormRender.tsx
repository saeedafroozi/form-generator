import React, { useState } from 'react';
import { FormMode, ControlType } from '../../constants/enum'
import { Component, Control } from '../../constants/index'
import { Factory } from '../../constants/getComponent'
import { IBaseComponent } from '../../constants/index'
import { bindActionCreators } from 'redux'
//import { convertToComponentModel } from '../../constants/ultility'
import { connect } from 'react-redux'
import { setValue } from '../../actions/index'
interface FormRendererProps {
    setValue: (id: string, mode: FormMode, value: string, type: ControlType) => void;
    //formDescriptor: Component[];
    //formDescriptor: Component[];
    //controlFactory?: (control: Component) => React.ReactNode;
    mode: FormMode;
    //downloadUrl?: string;
    //onCreated?: (form: FormDesignerOnCreateArg) => void;
    //[index: string]: any;
}

type FormRendererOnCreateArg = {
    validate?: () => PromiseLike<{ errors: any[], values: object }>;
    setFieldsValue?: (value: object) => void;
}
interface FormRendererState {
    structure: Component[];
}

const FormRenderer = ({ structure, mode, setValue }: FormRendererProps & FormRendererState) => {

    const handleOnChange = (attribute: any, id: string, mode: FormMode, type: ControlType) => {
        setValue(id, mode,attribute, type)
    }
    return <React.Fragment>
        {structure.map((Component) => {
            let instance = Factory.create(Component.Type);
            return <div key={Component.Id}>{(instance as IBaseComponent).getComponent(mode, handleOnChange, Component.Id, Component.Attributes)}</div>
        })}
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
    return bindActionCreators({ setValue }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRenderer)
