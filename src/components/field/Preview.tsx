import React from 'react'
import { FormRenderer } from '../formRenderer/index'
import { FormMode } from '../../constants/enum'
interface PreviewProps {
    activeTab: number;
}
const Preview = () => {
    return <React.Fragment>
        <div id="Preview" key="Preview" className={"show"}>
            <form className="form">
                <FormRenderer
                    mode={FormMode.View}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </React.Fragment>
}
export default Preview;