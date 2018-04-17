import { RECEIVE_POSTS, CLEAR_POSTS } from '../actions/post_actions';
import merge from 'lodash/merge';

const PostReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      let dup = Object.assign({}, state);
      let dupLength = Object.keys(dup).length;
      action.posts.forEach((post, idx) => {
        dup[dupLength+idx+1] = post;
      });
      return merge({}, dup);
    case CLEAR_POSTS:
      return {};
    default:
      return state;
  }
};

export default PostReducer;
