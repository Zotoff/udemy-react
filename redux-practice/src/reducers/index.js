import {combineReducers} from 'redux';
import artists from './artist_reducer';

// Combining the reducers
const rootReducer = combineReducers({
    artists
})

export default rootReducer;