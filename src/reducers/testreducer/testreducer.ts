const defaultState = {
    title: 'New Title',
    id: 1
}

const testReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'NEW_AD':
            return {
                ...state
            }

        case 'DELETE_AD':
            return {
                ...state,
                title: 'Deleted Item'
            }

        case 'PLUS':
            return {
                ...state,
                id: state.id + action.payload
            }

        default:
            return state
    }
}

export default testReducer