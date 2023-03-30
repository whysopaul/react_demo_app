import axios from "axios";
import { Dispatch } from "react";
import { sleep } from "../../utils";
import { GET_DATA, GET_DATA_IS_LOADING, paulDispatchTypes } from "./types";

export const getData = () => (dispatch: Dispatch<paulDispatchTypes>) => {
    const params = {

    }


    // вызов маркера загрузка на начало загрузки
    dispatch({
        type: GET_DATA_IS_LOADING,
        payload: true
    })

    sleep(3000)

    axios.get('https://api.vtargete.pro/api/gallery/getImagesForPaul', params).then(res => {


        // вызов маркера получения данных
        dispatch({
            type: GET_DATA,
            payload: res.data
        })

        // вызов маркера загрузка на конец загрузки
        dispatch({
            type: GET_DATA_IS_LOADING,
            payload: false
        })
    }).catch(err => {

        // вызов маркера загрузка на конец загрузки
        dispatch({
            type: GET_DATA_IS_LOADING,
            payload: false
        })

    })
}