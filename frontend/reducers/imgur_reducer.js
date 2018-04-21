import { RECEIVE_HTML } from '../actions/post_actions';
import merge from 'lodash/merge';

const ImgurReducer = (state = "", action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_HTML:
      return action.imageUrl;
    default:
      return state;
  }
};

export default ImgurReducer;
