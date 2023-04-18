import { REPHRASE_CREATE_REPHRASE_PROJECT, REPHRASE_GET_REPHRASE_PROJECTS, REPHRASE_UPDATE_REPHRASE_PROJECT, TRephraseProject, rephraseDispatchTypes } from "../../actions/rephrase/types"

interface IDefaultState {
    projects: TRephraseProject[]
}

const defaultState: IDefaultState = {
    projects: []
}

const rephraseReducer = (state: IDefaultState = defaultState, action: rephraseDispatchTypes) => {
    switch (action.type) {
        case REPHRASE_GET_REPHRASE_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case REPHRASE_CREATE_REPHRASE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        case REPHRASE_UPDATE_REPHRASE_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects.map(i => {
                        if (i.id === action.payload.id) {
                            return action.payload
                        }
                        return i
                    })
                ]
            }
        default:
            return state
    }
}

export default rephraseReducer