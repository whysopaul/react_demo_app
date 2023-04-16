import { ADD_FRAGMENT, DELETE_FRAGMENT, GET_REPHRASE_OBJECTS, SET_REPHRASE_MODE, TRephraseMode, UPDATE_TITLE, rephraseDispatchTypes } from "../../actions/rephrase/types"

interface IDefaultState {
    title: string,
    fragments: {
        id: number,
        mode: TRephraseMode
    }[],
    getRephraseObjects: any
}

const defaultState: IDefaultState = {
    title: 'Новый проект',
    fragments: [{
        id: 1,
        mode: 'Entire'
    }],
    getRephraseObjects: null
}

const rephraseReducer = (state: IDefaultState = defaultState, action: rephraseDispatchTypes) => {
    switch (action.type) {
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case ADD_FRAGMENT:
            return {
                ...state,
                fragments: [...state.fragments, action.payload]
            }
        case DELETE_FRAGMENT:
            return {
                ...state,
                fragments: [...state.fragments.filter(i => i.id !== action.payload)]
            }
        // case SET_REPHRASE_MODE:
        //     return {
        //         ...state,
        //         fragments: [...state.fragments.map(fragment => {
        //             if (fragment.id === action.payload.id) {
        //                 return {
        //                     ...fragment,
        //                     mode: action.payload.mode
        //                 }
        //             }
        //             return fragment
        //         })]
        //     }
        case GET_REPHRASE_OBJECTS:
            return {
                ...state,
                getRephraseObjects: action.payload
            }
        default:
            return state
    }
}

export default rephraseReducer