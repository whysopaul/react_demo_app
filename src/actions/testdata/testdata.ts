import { Dispatch } from "react";
import { ADD_NEW_ITEM, AdData, CHANGE_ITEM, DELETE_ITEM, GET_TEST_DATA, testDataDispatchTypes } from "./types";

export const getTestData = () => (dispatch: Dispatch<testDataDispatchTypes>) => {
    dispatch({
        type: GET_TEST_DATA,
    })
}

export const addNewItem = (item: AdData) => (dispatch: Dispatch<testDataDispatchTypes>) => {
    dispatch({
        type: ADD_NEW_ITEM,
        payload: item
    })
}

export const changeItem = (item: AdData) => (dispatch: Dispatch<testDataDispatchTypes>) => {
    dispatch({
        type: CHANGE_ITEM,
        payload: item
    })
}

export const deleteItem = (id: number) => (dispatch: Dispatch<testDataDispatchTypes>) => {
    dispatch({
        type: DELETE_ITEM,
        payload: id
    })
}