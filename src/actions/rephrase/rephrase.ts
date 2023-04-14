import { Dispatch } from "react";
import { ADD_FRAGMENT, DELETE_FRAGMENT, UPDATE_TITLE, rephraseDispatchTypes } from "./types";

export const updateTitle = (title: string) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: UPDATE_TITLE,
        payload: title
    })
}

export const addFragment = (index: number) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: ADD_FRAGMENT,
        payload: index
    })
}

export const deleteFragment = (index: number) => (dispatch: Dispatch<rephraseDispatchTypes>) => {
    dispatch({
        type: DELETE_FRAGMENT,
        payload: index
    })
}