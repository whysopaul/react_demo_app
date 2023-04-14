export const LOGIN_VTARGETE = 'LOGIN_VTARGETE'

interface IAuthLogin {
    type: typeof LOGIN_VTARGETE,
    payload: any
}

export type authDispatchTypes = IAuthLogin