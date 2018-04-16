import * as APIUtil from '../util/reddit_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = object => ({
  type: RECEIVE_POSTS,
  posts: object.data.children
});

export const requestPosts = (afterString, postCount) => dispatch => (
  APIUtil.requestPosts(afterString, postCount).then(posts => dispatch(receivePosts(posts)))
);
