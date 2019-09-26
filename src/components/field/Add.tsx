import React from 'react'
import Select from '@material-ui/core/Select';
interface AddProps {
    activeTab: string;
    addControl: (e: any) => void;
}
const Add = ({ activeTab, addControl }: AddProps) => {
    return <React.Fragment>
        <div id="Add" key="Add" className={activeTab === "Add" ? "show" : "hidden"}>
            <h3>Add</h3>
            <div >
                {/* <div>
                    <button type="button" className="btn btn-default" id="ShortAnswer" onClick={addControl}> ShortAnswer</button>
                    <button type="button" className="btn btn-default">Paragraph</button>
                </div>
                <div>
                    <button type="button" className="btn btn-default">MultipleChoice</button>
                    <button type="button" className="btn btn-default">Checkboxes</button>
                </div>
                <div>
                    <button type="button" className="btn btn-default">Dropdown</button>
                    <button type="button" className="btn btn-default">FileUpload</button>
                </div>

                <div>
                    <button type="button" className="btn btn-default">DateTimepicker</button>

                </div> */}
               

            </div>
        </div>
    </React.Fragment >
}
export default Add;