import { AUTH_LOGIN_VTARGETE, TUserData, authDispatchTypes } from "../../actions/auth/types"

interface IDefaultState {
    userdata: TUserData
}

const defaultState: IDefaultState = {
    userdata: null
}

export const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes) => {
    switch (action.type) {
        case AUTH_LOGIN_VTARGETE:
            // console.log('hehehe')
            return {
                ...state,
                userdata: action.payload
            }
        default:
            return state
    }
}