// Reducer finds a match. Arguments: previousState and action with payload

export default function(state = {}, action){
    switch(action.type){
        case 'MOVIES_LIST':
            // Returns all the state information from action and setting up the new state with movies
            return {...state,movies:action.payload}
        default:
            return state;
    }
}