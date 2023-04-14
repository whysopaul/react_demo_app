import { ADD_FRAGMENT, DELETE_FRAGMENT, UPDATE_TITLE, rephraseDispatchTypes } from "../../actions/rephrase/types"

interface IDefaultState {
    title: string,
    fragments: number[]
}

const defaultState: IDefaultState = {
    title: 'Новый проект',
    fragments: [1]
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
                fragments: [...state.fragments.filter(i => i !== action.payload)]
            }
        default:
            return state
    }
}

export default rephraseReducer