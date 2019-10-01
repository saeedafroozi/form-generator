import { ControlType, FormMode } from '../constants/enum'

export const ACTION_TYPES = {
    ADD_CONTROL: 'ADD_CONTROL',
    DELETE_CONTROL: 'DELETE_CONTROL',
    SET_VALUE: 'SET_VALUE',
    CHANGE_SWITCH: 'CHANGE_SWITCH'
}
export const addControl = (selectedControl: number, id: string) => {

    return {
        type: ACTION_TYPES.ADD_CONTROL,
        payload: { type: selectedControl, id: id }
    };

}
export const deleteControl = (id: string) => {

    return {
        type: ACTION_TYPES.DELETE_CONTROL,
        payload: { id: id }
    };

}
export const changeSwitch = (value: boolean, controlId: string) => {
    return {
        type: ACTION_TYPES.CHANGE_SWITCH,
        payload: { id: controlId }
    };
}
export const setValue = (id: string, mode: FormMode, attributes: any, type: ControlType) => {

    return {
        type: ACTION_TYPES.SET_VALUE,
        payload: { id: id, mode: mode, attributes: attributes, type: type }
    };

}