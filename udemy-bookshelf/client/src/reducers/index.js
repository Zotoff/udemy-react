import {combineReducers} from 'redux';
import books from './books_reducer';
import user from './user_reducer';

// Combining the reducers
const rootReducer = combineReducers({
    books,
    user
});
export default rootReducer;