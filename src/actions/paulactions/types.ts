export const GET_DATA = 'GET_DATA'
export const GET_DATA_IS_LOADING = 'GET_DATA_IS_LOADING'


export type TPaulImage = {
    id: number,
    name: string,
    type: string,
    url: string,
    account: any
}

interface IGetData {
    type: typeof GET_DATA,
    payload: TPaulImage[]
}

interface IGetDataTwo {
    type: any,
    payload: any
}

interface ILoading {
    type: typeof GET_DATA_IS_LOADING,
    payload: boolean
}



export type paulDispatchTypes = IGetData | IGetDataTwo | ILoading