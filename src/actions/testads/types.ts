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