import { TCreateAlert } from "../alerts/types"

export const REPHRASE_GET_REPHRASE_PROJECTS = 'REPHRASE_GET_REPHRASE_PROJECTS'
export const REPHRASE_CREATE_REPHRASE_PROJECT = 'REPHRASE_CREATE_REPHRASE_PROJECT'
export const REPHRASE_UPDATE_REPHRASE_PROJECT = 'REPHRASE_UPDATE_REPHRASE_PROJECT'
export const REPHRASE_DELETE_REPHRASE_PROJECT = 'REPHRASE_DELETE_REPHRASE_PROJECT'
export const REPHRASE_GET_REPHRASE_OPTIONS = 'REPHRASE_GET_REPHRASE_OPTIONS'
export const REPHRASE_IS_LOADING = 'REPHRASE_IS_LOADING'

export type TRephraseProject = {
    account: number,
    data: {
        position: number,
        variants: {
            id: number,
            is_selected: boolean,
            text: string
        }[]
    }[],
    id: number,
    name: string
}

export type TRephraseResponse = {
    id: number,
    position: number,
    result: string[]
}

export type TRephraseFragmentMode = {
    position: number,
    variants: {
        id: number,
        is_selected: boolean,
        text: string
    }[],
    showModes: boolean,
    mode: 'Entire' | 'Paragraph' | 'Personal',
    is_synonyms: boolean,
    batch: number[],
    custom_start: string
}

interface IGetRephraseProjects {
    type: typeof REPHRASE_GET_REPHRASE_PROJECTS,
    payload: TRephraseProject[]
}

interface ICreateRephraseProject {
    type: typeof REPHRASE_CREATE_REPHRASE_PROJECT,
    payload: TRephraseProject
}

interface IUpdateRephraseProject {
    type: typeof REPHRASE_UPDATE_REPHRASE_PROJECT,
    payload: TRephraseProject
}

interface IDeleteRephraseProject {
    type: typeof REPHRASE_DELETE_REPHRASE_PROJECT,
    payload: string
}

interface IGetRephraseOptions {
    type: typeof REPHRASE_GET_REPHRASE_OPTIONS,
    payload: TRephraseResponse
}

interface IRephraseIsLoading {
    type: typeof REPHRASE_IS_LOADING,
    payload: boolean
}

export type rephraseDispatchTypes = IGetRephraseProjects | ICreateRephraseProject | IUpdateRephraseProject | IDeleteRephraseProject | IGetRephraseOptions | IRephraseIsLoading | TCreateAlert