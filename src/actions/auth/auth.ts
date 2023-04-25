import { Dispatch } from "react";
import { AUTH_LOGIN_VTARGETE, AUTH_LOGOUT, TUserData, authDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import store from "../../store";
import { CREATE_ALERT } from "../alerts/types";

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

        dispatch({
            type: CREATE_ALERT,
            payload: {
                type: 'Success',
                message: 'Вход выполнен'
            }
        })

    }).catch(error => {
        console.log(error)

        dispatch({
            type: CREATE_ALERT,
            payload: {
                type: 'Error',
                message: 'Возникла ошибка'
            }
        })
    })
}

export const authLogout = () => (dispatch: Dispatch<authDispatchTypes>) => {
    dispatch({
        type: AUTH_LOGOUT
    })
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