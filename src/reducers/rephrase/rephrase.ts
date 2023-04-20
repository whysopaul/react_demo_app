import { REPHRASE_CREATE_REPHRASE_PROJECT, REPHRASE_GET_REPHRASE_OPTIONS, REPHRASE_GET_REPHRASE_PROJECTS, REPHRASE_IS_LOADING, REPHRASE_UPDATE_REPHRASE_PROJECT, TRephraseProject, TRephraseResponse, rephraseDispatchTypes } from "../../actions/rephrase/types"

interface IDefaultState {
    projects: TRephraseProject[],
    responses: TRephraseResponse[],
    is_loading: boolean
}

const defaultState: IDefaultState = {
    projects: [],
    responses: [],
    is_loading: false
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

        case REPHRASE_GET_REPHRASE_OPTIONS:
            return {
                ...state,
                responses: [
                    ...state.responses.map(i => {
                        if (i.id === action.payload.id && i.position === action.payload.position) {
                            return {
                                ...i,
                                result: action.payload.result
                            }
                        }
                        return i
                    }),
                    action.payload
                ]
            }

        case REPHRASE_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }

        default:
            return state
    }
}

export default rephraseReducer