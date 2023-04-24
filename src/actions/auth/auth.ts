import { Dispatch } from "react";
import { AUTH_LOGIN_VTARGETE, TUserData, authDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import store from "../../store";

export const loginVTargete = (username: string, password: string) => (dispatch: Dispatch<authDispatchTypes>) => {

    // console.log(username, password)

    // const body = JSON.stringify({ username, password })

    // console.log(body)

    axios.post(SERVER_URL + 'api/auth/login', { username, password }).then(res => {
        // console.log(res.data)

        dispatch({
            type: AUTH_LOGIN_VTARGETE,
            payload: res.data
        })

    }).catch(err => console.log(err))
}

export const withToken = (params?) => {

    const state = store.getState()
    const userState: TUserData = state['authReducer']['userdata']

    return {
        headers: {
            Authorization: 'Token ' + userState.token
        },
        params: params
    }
}