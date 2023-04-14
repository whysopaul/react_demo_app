import { Dispatch } from "react";
import { authDispatchTypes } from "./types";
import axios from "axios";
import { SERVER_URL } from "../../utils";

export const loginVTargete = (username: string, password: string) => (dispatch: Dispatch<authDispatchTypes>) => {

    const body = JSON.stringify({ username, password })

    axios.post(SERVER_URL + 'api/auth/login', body).then(res => {
        res.data
        console.log(res.data)
    })
}