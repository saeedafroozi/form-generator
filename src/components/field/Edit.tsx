import React from 'react'
interface EditProps {
    activeTab: string;
}
const Edit = ({ activeTab }: EditProps) => {
    return <React.Fragment>
        <div id="Edit" key="Edit" className={activeTab === "Edit" ? "show" : "hidden"}>
            <h3>Edit</h3>
            <div >


            </div>
        </div>
    </React.Fragment>
}
export default Edit;