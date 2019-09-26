import { ACTION_TYPES } from '../actions/index'
import { Component } from '../constants/index'
import { ControlType, FormMode } from '../constants/enum'
import { AnyAction } from 'redux';

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


export default (state: StateModel = initState, action: Action): StateModel => {

    switch (action.type) {
        case ACTION_TYPES.ADD_CONTROL:
            return {
                ...state,
                structure: [...state.structure, { Type: action.payload.Type, Id: action.payload.Id }],
                selectedControl: action.payload.Type
            };
        case ACTION_TYPES.SET_VALUE:

            const list = [...state.structure];
            const index = list.findIndex(x => x.Id === action.payload.Id);
            const obj = { ...list[index], Attributes: list[index].Attributes ? { ...list[index].Attributes } : null };



            if (action.payload.Mode === FormMode.Edit) {
                if (action.payload.Type === ControlType.ShortAnswer || action.payload.Type === ControlType.Paragraph) {

                    if (obj.Attributes && obj.Attributes.questionValue) {
                        obj.Attributes.questionValue = action.payload.Value;
                    }
                    else {
                        obj.Attributes = { questionValue: action.payload.Value }
                    }
                }

            }
            else {
                if (obj.Attributes && obj.Attributes.answerValue) {
                    obj.Attributes.answerValue = action.payload.Value;
                }
                else {
                    obj.Attributes = { answerValue: action.payload.Value }
                }
            }
            const newArray = [...list.slice(0, index), obj, ...list.slice(index + 1)]
            return {
                ...state,
                structure: newArray
            };
        // case ACTION_TYPES.SELECT_CATEGORY:
        //     return {
        //         ...state,
        //         selectedCategory: action.payload.selectedCategory,
        //         images: action.payload.images,
        //         isLoading: false,
        //         pageIndex: 1
        //     };
        default:
            return state;
    }
}   