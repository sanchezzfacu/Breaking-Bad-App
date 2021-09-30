import axios from 'axios';

export function getCharacters() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/characters');
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data
        })
    }
}

export function getNameCharacters(name) {
    return async function(dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/character?name=' + name)
            return dispatch({
                type: 'GET_NAME_CHARACTERS',
                payload: json.data
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export function orderByName(payload) {          
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterCharactersByStatus(payload) {           
    return {
        type: 'FILTER_BY_STATUS',
        payload
      }
}

export function filterCreated(payload) {            
    return {
        type: 'FILTER_CREATED',
        payload
    }
}  