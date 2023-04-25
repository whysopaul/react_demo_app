import { TCreateAlert } from "../alerts/types"

export const AUTH_LOGIN_VTARGETE = 'AUTH_LOGIN_VTARGETE'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

interface IAuthLogin {
    type: typeof AUTH_LOGIN_VTARGETE,
    payload: TUserData
}

interface IAuthLogout {
    type: typeof AUTH_LOGOUT
}

export type TUserData = {
    id: number,
    token: string,
    username: string,
    is_admin: boolean,
    vk_profile?: {
        photo: string
    }
}

export type authDispatchTypes = IAuthLogin | IAuthLogout | TCreateAlert