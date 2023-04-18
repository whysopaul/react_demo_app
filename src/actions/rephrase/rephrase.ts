import { Dispatch } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { withToken } from "../auth/auth";
import { REPHRASE_CREATE_REPHRASE_PROJECT, REPHRASE_GET_REPHRASE_PROJECTS, REPHRASE_UPDATE_REPHRASE_PROJECT, rephraseDispatchTypes } from "./types";
import { CREATE_ALERT } from "../alerts/types";
import store from "../../store";
import { TUserData } from "../auth/types";

export const getRephraseProjects = () => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const params = withToken()

    axios.get(SERVER_URL + 'api/gpt/get_rephrase_objects', params).then(res => {
        // console.log(res.data.sort((a, b) => a.id - b.id))
        dispatch({
            type: REPHRASE_GET_REPHRASE_PROJECTS,
            payload: res.data.sort((a, b) => a.id - b.id)
        })
    }).catch(error => console.log(error))
}

export const createRephraseProject = () => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const body = {
        name: 'Новый проект'
    }
    const params = withToken()

    axios.post(SERVER_URL + 'api/gpt/create_rephrase_object', body, params).then(res => {
        // console.log(res.data)
        dispatch({
            type: REPHRASE_CREATE_REPHRASE_PROJECT,
            payload: res.data
        })

        dispatch({
            type: CREATE_ALERT,
            payload: {
                message: 'Проект создан',
                type: 'Success'
            }
        })
    }).catch(error => {
        console.log(error)

        dispatch({
            type: CREATE_ALERT,
            payload: {
                message: 'Возникла ошибка',
                type: 'Error'
            }
        })
    })
}

export const updateRephraseProject = (name: string, id: number, text: { position: number, variants: { id: number, is_selected: boolean, text: string }[] }[]) => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const body = {
        name,
        id,
        text
    }
    const params = withToken()

    axios.post(SERVER_URL + 'api/gpt/update_rephrase_object', body, params).then(res => {
        // console.log(res.data)
        dispatch({
            type: REPHRASE_UPDATE_REPHRASE_PROJECT,
            payload: res.data
        })

        dispatch({
            type: CREATE_ALERT,
            payload: {
                message: 'Проект обновлен',
                type: 'Success'
            }
        })
    }).catch(error => {
        console.log(error)

        dispatch({
            type: CREATE_ALERT,
            payload: {
                message: 'Возникла ошибка',
                type: 'Error'
            }
        })
    })
}

export const deleteRephraseProject = (id: number) => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const state = store.getState()
    const userState: TUserData = state['authReducer']['userdata']

    axios.delete(SERVER_URL + 'api/gpt/delete_rephrase_object', {
        headers: {
            Authorization: 'Token ' + userState.token
        },
        data: {
            id
        }
    }).then(res => {
        console.log(res.data)

    })
}