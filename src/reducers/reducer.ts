import { ACTION_TYPES } from '../actions/index'
import { Component, IBaseComponent } from '../constants/index'
import { ControlType, FormMode } from '../constants/enum'
import { Factory } from '../constants/getComponent';
const uid = require('uuid/v1')


// const initState:Component = {
//     DataIndex?: undefined,
//     Label?: undefined,
//     Required?: false,
//     Attributes?: undefined,
//     Type: null,
//     id: ""

// };
interface Action {
    type: string;
    payload: any;
}
interface StateModel {
    structure: Component[];
    selectedControl: number
}
const initState = {
    structure: [],
    selectedControl: 0
}


const ACTION_HANDLERS = {
    [ACTION_TYPES.ADD_CONTROL]: handleAddControl,
    [ACTION_TYPES.SET_VALUE]: handleSetValue
}
const object_handlers = {
    [ControlType.ShortAnswer]: handleShortAnswer,
    [ControlType.Paragraph]: handleShortAnswer,
    [ControlType.MultipleChoice]: handleMultipleChoice,
    [ControlType.Checkboxes]: handleCheckboxes
}
function handleMultipleChoice(state, payload) {
    return { attributes: { questionOptions: [{ id: uid(), value: "Option" + 1 }] }, type: payload.type, id: payload.id }
}
function handleCheckboxes(state, payload) {
    return { attributes: { questionOptions: [{ id: uid(), value: "Option" + 1, selected: false }] }, type: payload.type, id: payload.id }
}
function handleShortAnswer(state, payload) {
    return { type: payload.type, id: payload.id };
}

function handleAddControl(state, payload) {
    return {
        ...state,
        structure: [...state.structure, (object_handlers[payload.type] || (() => state))(state, payload)],
        selectedControl: payload.type
    };
}

function handleSetValue(state, payload) {
    const list = [...state.structure];
    const index = list.findIndex(x => x.id === payload.id);
    const obj = { ...list[index], attributes: list[index].attributes ? { ...list[index].attributes } : null };
    let newObj;
    //if (payload.mode === FormMode.Edit) {
        newObj = (Factory.create(payload.type) as IBaseComponent).changeHandler(obj, payload.attributes);
    //}
    // else {
    //     if (obj.attributes && obj.attributes.answerValue) {
    //         obj.attributes.answerValue = payload.Value;
    //     }
    //     else {
    //         obj.attributes = { answerValue: payload.Value }
    //     }
    // }
    const newArray = [...list.slice(0, index), newObj, ...list.slice(index + 1)]
    return {
        ...state,
        structure: newArray
    };
}

export default (state: StateModel = initState, action: Action): StateModel => (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload);

