import { GET_DATA, GET_DATA_IS_LOADING, paulDispatchTypes, TPaulImage } from "../../actions/paulactions/types"


interface IDefaultState {
    data: TPaulImage[],
    is_loading: boolean
}

const defaultState: IDefaultState = {
    data: [],
    is_loading: false
}

const paulReducer = (state: IDefaultState = defaultState, action: paulDispatchTypes) => {
    switch (action.type) {

        case GET_DATA_IS_LOADING:
            return {
                ...state,
                is_loading: action.payload
            }
        case GET_DATA:
            return {
                ...state,
                data: action.payload
            }

        default:
            return state
    }
}

export default paulReducer
