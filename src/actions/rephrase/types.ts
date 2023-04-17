export const REPHRASE_GET_REPHRASE_PROJECTS = 'REPHRASE_GET_REPHRASE_PROJECTS'
export const REPHRASE_CREATE_REPHRASE_PROJECT = 'REPHRASE_CREATE_REPHRASE_PROJECT'

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

export type TRephraseFragmentMode = {
    position: number,
    variants: {
        id: number,
        is_selected: boolean,
        text: string
    }[],
    showModes: boolean,
    mode: 'Entire' | 'Paragraph' | 'Personal',
    is_synonyms: boolean
}

interface IGetRephraseProjects {
    type: typeof REPHRASE_GET_REPHRASE_PROJECTS,
    payload: TRephraseProject[]
}

interface ICreateRephraseProject {
    type: typeof REPHRASE_CREATE_REPHRASE_PROJECT,
    payload: any
}

export type rephraseDispatchTypes = IGetRephraseProjects | ICreateRephraseProject