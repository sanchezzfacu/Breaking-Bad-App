
const initialState = {
    characters : [],
    allCharacters: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_CHARACTERS':
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload
            }

        case 'FILTER_BY_STATUS':
            const allCharacters = state.allCharacters
            const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.occupation === action.payload)
            return {
                ...state,
                characters: statusFiltered
            }
        
        case 'FILTER_CREATED': 
            const allCharacters2 = state.allCharacters
            const createdFilter = action.payload === 'created' ? allCharacters2.filter(el => el.createdInDb) : state.allCharacters.filter(el => !el.createdInDb)             
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            }
        
        case 'GET_NAME_CHARACTERS': 
            return {
                ...state,
                characters: action.payload
            }

        default :
            return state
    }
}

export default rootReducer;