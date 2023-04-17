import { Dispatch } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { withToken } from "../auth/auth";
import { REPHRASE_CREATE_REPHRASE_PROJECT, REPHRASE_GET_REPHRASE_PROJECTS, rephraseDispatchTypes } from "./types";

export const getRephraseProjects = () => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const params = withToken()

    axios.get(SERVER_URL + 'api/gpt/get_rephrase_objects', params).then(res => {
        // console.log(res.data.sort((a, b) => a.id - b.id))
        dispatch({
            type: REPHRASE_GET_REPHRASE_PROJECTS,
            payload: res.data.sort((a, b) => a.id - b.id)
        })
    }).catch(err => console.log(err))
}

export const createRephraseProject = () => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const body = {
        name: 'Новый проект'
    }
    const params = withToken()

    axios.post(SERVER_URL + 'api/gpt/create_rephrase_object', body, params).then(res => {
        console.log(res.data)
        dispatch({
            type: REPHRASE_CREATE_REPHRASE_PROJECT,
            payload: res.data
        })
    })
}