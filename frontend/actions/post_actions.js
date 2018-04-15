import * as APIUtil from '../util/reddit_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = object => ({
  type: RECEIVE_POSTS,
  posts: object.data.children
});

export const requestPosts = () => dispatch => (
  APIUtil.requestPosts().then(posts => dispatch(receivePosts(posts)))
);
