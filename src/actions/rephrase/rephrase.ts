import { Dispatch } from "react";
import { ADD_FRAGMENT, DELETE_FRAGMENT, GET_REPHRASE_OBJECTS, SET_REPHRASE_MODE, TRephraseMode, UPDATE_TITLE, rephraseDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { withToken } from "../auth/auth";

export const updateTitle = (title: string) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: UPDATE_TITLE,
        payload: title
    })
}

export const addFragment = (index: number) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: ADD_FRAGMENT,
        payload: {
            id: index,
            mode: 'Entire'
        }
    })
}

export const deleteFragment = (index: number) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: DELETE_FRAGMENT,
        payload: index
    })
}

// export const setRephraseMode = (index: number, mode: TRephraseMode) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
//     dispatch({
//         type: SET_REPHRASE_MODE,
//         payload: {
//             id: index,
//             mode: mode
//         }
//     })
// }

export const getRephraseObjects = () => (dispatch: Dispatch<rephraseDispatchTypes>) => {

    const params = withToken()

    axios.get(SERVER_URL + 'api/gpt/get_rephrase_objects', params).then(res => {
        console.log(res.data)

        dispatch({
            type: GET_REPHRASE_OBJECTS,
            payload: res.data
        })
    }).catch(err => console.log(err))
}