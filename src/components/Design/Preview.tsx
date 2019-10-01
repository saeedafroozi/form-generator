import React from 'react'
import { FormRenderer } from '../formRenderer/index'
import { FormMode } from '../../constants/enum'
import Button from '@material-ui/core/Button';
interface PreviewProps {
    activeTab: number;
}
const Preview = () => {
    return <React.Fragment>
        <div id="Preview" key="Preview" className={"show"}>
            <form className="form" >
                <FormRenderer
                    mode={FormMode.View}
                />
                <div className="button-parent" >
                    <Button variant="contained" className="submit"  >
                        Submit
               </Button>
                </div>
            </form>
        </div>
    </React.Fragment>
}
export default Preview;