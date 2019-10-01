import { ACTION_TYPES } from '../actions/index'
import { Control, IBaseComponent } from '../constants/index'
import { ControlType } from '../constants/enum'
import { Factory } from '../constants/getComponent';
const uid = require('uuid/v1')

interface Action {
    type: string;
    payload: any;
}
interface StateModel {
    structure: Control[];
    selectedControl: number
}
const initState = {
    structure: [],
    selectedControl: 0
}


const ACTION_HANDLERS = {
    [ACTION_TYPES.ADD_CONTROL]: handleAddControl,
    [ACTION_TYPES.SET_VALUE]: handleSetValue,
    [ACTION_TYPES.DELETE_CONTROL]: handleDeleteControl,
    [ACTION_TYPES.CHANGE_SWITCH]: handleChangeSwitch
}
const object_handlers = {
    [ControlType.ShortAnswer]: handleAddShortAnswer,
    [ControlType.Paragraph]: handleAddShortAnswer,
    [ControlType.MultipleChoice]: handleAddMultipleChoice,
    [ControlType.Checkboxes]: handleAddCheckboxes,
    [ControlType.Dropdown]: handleAddDropDown,
    [ControlType.DateTimepicker]: handleAddDateTimepicker
}
function handleAddDateTimepicker(state, payload) {
    return { type: payload.type, id: payload.id,required:false };
}
function handleAddMultipleChoice(state, payload) {
    return { attributes: { questionOptions: [{ id: uid(), value: "Option" + 1 }] }, type: payload.type, id: payload.id,required:false }
}
function handleAddDropDown(state, payload) {
    return { attributes: { questionOptions: [{ id: uid(), value: "Option" + 1 }] }, type: payload.type, id: payload.id,required:false }
}
function handleAddCheckboxes(state, payload) {
    return { attributes: { questionOptions: [{ id: uid(), value: "Option" + 1, selected: false }] }, type: payload.type, id: payload.id,required:false }
}
function handleAddShortAnswer(state, payload) {
    return { type: payload.type, id: payload.id,required:false };
}

function handleAddControl(state, payload) {
    return {
        ...state,
        structure: [...state.structure, (object_handlers[payload.type] || (() => state))(state, payload)],
        selectedControl: payload.type
    };
}
function handleChangeSwitch(state, payload) {
    const list = [...state.structure];
    const index = list.findIndex(x => x.id === payload.id);
    const newObj = {...list[index]}
    newObj.required = true;
    const newArray = [...list.slice(0, index), newObj, ...list.slice(index + 1)]
    return {
        ...state,
        structure: newArray
    };
}
function handleDeleteControl(state, payload) {
    const list = [...state.structure];
    const index = list.findIndex(x => x.id === payload.id);
    const newArray = [...list.slice(0, index), ...list.slice(index + 1)]
    return {
        ...state,
        structure: newArray
    };
}

function handleSetValue(state, payload) {
    const list = [...state.structure];
    const index = list.findIndex(x => x.id === payload.id);
    const obj = { ...list[index], attributes: list[index].attributes ? { ...list[index].attributes } : null };
    let newObj;

    newObj = (Factory.create(payload.type) as IBaseComponent).changeHandler(obj, payload.attributes,payload.mode);
    const newArray = [...list.slice(0, index), newObj, ...list.slice(index + 1)]
    return {
        ...state,
        structure: newArray
    };
}

export default (state: StateModel = initState, action: Action): StateModel => {
    return  (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload);
}

