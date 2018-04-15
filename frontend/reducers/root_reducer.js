import {combineReducers} from 'redux';
import PostReducer from './post_reducer';

const rootReducer = combineReducers({
  posts: PostReducer
});

export default rootReducer;
