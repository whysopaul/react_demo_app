import { parsedTestData } from "../../actions/testdata/testdata"
import { ADD_NEW_ITEM, AdData, CHANGE_ITEM, DELETE_ITEM, GET_TEST_DATA, TResultData, testDataDispatchTypes } from "../../actions/testdata/types"

interface IDefaultState {
    data: AdData[]
}

const defaultState: IDefaultState = {
    data: []
}

const testDataReducer = (state: IDefaultState = defaultState, action: testDataDispatchTypes) => {
    switch (action.type) {
        case GET_TEST_DATA:
            return {
                ...state,
                data: parsedTestData.result.Ads
            }

        case ADD_NEW_ITEM:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }

        case CHANGE_ITEM:
            return {
                ...state,
                data: [...state.data.map(el => {
                    if (el.Id === action.payload.Id) {
                        return {
                            ...el,
                            State: action.payload.State,
                            TextAd: {
                                ...el.TextAd,
                                Title: action.payload.TextAd.Title
                            }
                        }
                    }
                    return el
                })]
            }

        case DELETE_ITEM:
            return {
                ...state,
                data: [...state.data.filter(el => el.Id !== action.payload)]
            }

        default:
            return state
    }
}

export default testDataReducer