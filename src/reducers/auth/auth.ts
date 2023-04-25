import { AUTH_LOGIN_VTARGETE, AUTH_LOGOUT, TUserData, authDispatchTypes } from "../../actions/auth/types"
import { URL } from "../../utils"

interface IDefaultState {
    userdata: TUserData
}

const defaultState: IDefaultState = {
    userdata: {
        id: -1,
        token: '',
        username: 'Гость',
        is_admin: false
    }
}

export const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes) => {
    switch (action.type) {
        case AUTH_LOGIN_VTARGETE:
            // console.log('hehehe')
            return {
                ...state,
                userdata: action.payload
            }
        case AUTH_LOGOUT:
            window.location.replace(URL + '/')
            return defaultState
        default:
            return state
    }
}