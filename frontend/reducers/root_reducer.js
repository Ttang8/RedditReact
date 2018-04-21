import {combineReducers} from 'redux';
import PostReducer from './post_reducer';
import ImgurReducer from './imgur_reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  imgurUrl: ImgurReducer
});

export default rootReducer;
