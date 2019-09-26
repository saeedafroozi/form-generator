import React from 'react'
import { Component } from '../../constants/index'
import { FormRenderer } from '../formRenderer/index'
import { FormMode } from '../../constants/enum'
interface EditorProps {
    activeTab: number;
}
const Editor = ({ activeTab }: EditorProps) => {
    return <React.Fragment>
        <div id="Editor" key="Editor" className={activeTab === 0 ? "show" : "hidden"}>
            {activeTab === 0 && <FormRenderer
                mode={FormMode.Edit}
            />}
        </div>
    </React.Fragment>
}
export default Editor;