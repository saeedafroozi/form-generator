import { ControlType, FormMode } from '../constants/enum'

export const ACTION_TYPES = {
    ADD_CONTROL: 'ADD_CONTROL',
    SET_VALUE: 'SET_VALUE',
}
export const addControl = (selectedControl: number, id: string) => {

    return {
        type: ACTION_TYPES.ADD_CONTROL,
        payload: { type: selectedControl, id: id }
    };
   
}
export const setValue = (id: string, mode: FormMode, attribute:any,type:ControlType) => {
   
    return {
        type: ACTION_TYPES.SET_VALUE,
        payload: { id: id, mode: mode, value: attribute,type:type }
    };
   
}