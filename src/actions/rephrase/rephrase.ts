import { Dispatch } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { withToken } from "../auth/auth";
import { REPHRASE_CREATE_REPHRASE_PROJECT, REPHRASE_DELETE_REPHRASE_PROJECT, REPHRASE_GET_REPHRASE_OPTIONS, REPHRASE_GET_REPHRASE_PROJECTS, REPHRASE_IS_LOADING, REPHRASE_UPDATE_REPHRASE_PROJECT, rephraseDispatchTypes } from "./types";
import { CREATE_ALERT } from "../alerts/types";

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

    const params = withToken({ id })

    axios.delete(SERVER_URL + 'api/gpt/delete_rephrase_object', params).then(res => {
        // console.log(res.data)

        dispatch({
            type: REPHRASE_DELETE_REPHRASE_PROJECT,
            payload: res.data
        })

        dispatch({
            type: CREATE_ALERT,
            payload: {
                message: 'Проект удален',
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

export const getRephraseOptions = (id: number, position: number, text: string, is_synonyms: boolean, batch: number[], custom_start: string) => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    dispatch({
        type: REPHRASE_IS_LOADING,
        payload: true
    })

    const body = {
        text,
        is_synonyms,
        batch,
        custom_start
    }
    const params = withToken()

    axios.post(SERVER_URL + 'api/gpt/get_rephrase_options', body, params).then(res => {
        // console.log(res.data)

        dispatch({
            type: REPHRASE_GET_REPHRASE_OPTIONS,
            payload: {
                id,
                position,
                result: res.data
            }
        })

        dispatch({
            type: REPHRASE_IS_LOADING,
            payload: false
        })
    }).catch(error => {
        console.log(error)

        dispatch({
            type: REPHRASE_IS_LOADING,
            payload: false
        })
    })
}