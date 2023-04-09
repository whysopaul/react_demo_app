export const GET_TEST_DATA = 'GET_TEST_DATA'
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM'
export const CHANGE_ITEM = 'CHANGE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export type TResultData = {
    result: {
        Ads: AdData[]
    }
}

export type AdData = {
    AdCategoties: null,
    AdGroupId: number,
    AgeLabel: null,
    CampaignId: number,
    Id: number,
    State: string,
    Status: string,
    StatusClarification: string,
    Subtype: null,
    TextAd: {
        AdExtensions: any[],
        AdImageHash: null,
        AdImageModeration: null,
        BusinessId: null,
        DisplayDomain: string,
        DisplayUrlPath: null,
        DisplayUrlPathModeration: null,
        Href: string,
        Mobile: string,
        SitelinkSetId: null,
        SitelinksModeration: null,
        Text: string,
        Title: string,
        Title2: null,
        TurboPageId: null,
        TurboPageModeration: null,
        VCardId: number,
        VCardModeration: {
            Status: string,
            StatusClarification: string
        },
        VideoExtension: null
    },
    Type: string
}

interface IGetTestData {
    type: typeof GET_TEST_DATA,
}

interface IAddNewItem {
    type: typeof ADD_NEW_ITEM,
    payload: AdData
}

interface IChangeItem {
    type: typeof CHANGE_ITEM,
    payload: AdData
}

interface IDeleteItem {
    type: typeof DELETE_ITEM,
    payload: number
}

export type testDataDispatchTypes = IGetTestData | IAddNewItem | IChangeItem | IDeleteItem