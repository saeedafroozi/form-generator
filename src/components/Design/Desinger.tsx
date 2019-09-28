import React, { useState } from 'react'
import { number } from 'prop-types';
import Add from './Add'
import Display from './Display'
import { Control, Component } from '../../constants/index'
import { ControlType } from '../../constants/enum'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addControl } from '../../actions/index'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Route, Link } from 'react-router-dom';
import { Preview } from '../field/index'
const  uid  = require('uuid/v1')
interface DesignerState {
    structure: Component[];
    selectedControl: number;
}
interface DesignerProps {
    dispatch?: (action: any) => void;
    addControl: (controlValue: number, id: string) => void;
}
const Designer = ({ dispatch, addControl, structure, selectedControl }: DesignerProps & DesignerState) => {

    return <React.Fragment>
        <AppBar className="app-bar" position="static">
            <Toolbar>
                <Link target="_blank" to="/preview"><VisibilityIcon className="visibility" /></Link>
            </Toolbar>
        </AppBar>
        <Route exact path="/preview" render={() => <Preview />}></Route>
        <Route exact path="/" render={() => <div className="designer">
            <div className="menu col-sm-2">
                <Add addControl={(e) => addControl(e.target.value, uid())} selected={selectedControl} />
            </div>
            <div className="form col-sm-10">
                <Display items={structure} />
            </div>
        </div>}></Route>
    </React.Fragment>

}
function mapStateToProps(state: DesignerState) {
    const { structure, selectedControl } = state
    return { structure, selectedControl };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ addControl }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Designer)