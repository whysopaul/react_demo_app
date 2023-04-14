export const UPDATE_TITLE = 'UPDATE_TITLE'
export const ADD_FRAGMENT = 'ADD_FRAGMENT'
export const DELETE_FRAGMENT = 'DELETE_FRAGMENT'

interface IUpdateTitle {
    type: typeof UPDATE_TITLE,
    payload: string
}

interface IAddFragment {
    type: typeof ADD_FRAGMENT,
    payload: number
}

interface IDeleteFragment {
    type: typeof DELETE_FRAGMENT,
    payload: number
}

export type rephraseDispatchTypes = IUpdateTitle | IAddFragment | IDeleteFragment