import { TCreateAlert } from "../alerts/types"

export const AUTH_LOGIN_VTARGETE = 'AUTH_LOGIN_VTARGETE'

interface IAuthLogin {
    type: typeof AUTH_LOGIN_VTARGETE,
    payload: TUserData
}

export type TUserData = {
    id: number,
    token: string,
    username: string,
    vk_profile?: {
        photo: string
    }
}

export type authDispatchTypes = IAuthLogin | TCreateAlert