import { RECEIVE_POSTS } from '../actions/post_actions';
import merge from 'lodash/merge';

const initialPhoto = [];

const PostReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      return merge({}, action.posts);
    default:
      return state;
  }
};

export default PostReducer;
