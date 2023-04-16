export const UPDATE_TITLE = 'UPDATE_TITLE'
export const ADD_FRAGMENT = 'ADD_FRAGMENT'
export const DELETE_FRAGMENT = 'DELETE_FRAGMENT'
export const SET_REPHRASE_MODE = 'SET_REPHRASE_MODE'
export const GET_REPHRASE_OBJECTS = 'GET_REPHRASE_OBJECTS'

interface IUpdateTitle {
    type: typeof UPDATE_TITLE,
    payload: string
}

export type TRephraseFragment = {
    id: number,
    mode: TRephraseMode
}

export type TRephraseMode = 'Entire' | 'Paragraph' | 'Personal'

interface IAddFragment {
    type: typeof ADD_FRAGMENT,
    payload: TRephraseFragment
}

interface IDeleteFragment {
    type: typeof DELETE_FRAGMENT,
    payload: number
}

// interface ISetRephraseMode {
//     type: typeof SET_REPHRASE_MODE,
//     payload: TRephraseFragment
// }

interface IGetRephraseObjects {
    type: typeof GET_REPHRASE_OBJECTS,
    payload: any
}

export type rephraseDispatchTypes = IUpdateTitle | IAddFragment | IDeleteFragment | IGetRephraseObjects