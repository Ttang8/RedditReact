import * as APIUtil from '../util/reddit_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const CLEAR_POSTS = "CLEAR_POSTS";

export const receivePosts = object => ({
  type: RECEIVE_POSTS,
  posts: object.data.children
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

export const requestPosts = (afterString, postCount, subreddit) => dispatch => (
  APIUtil.requestPosts(afterString, postCount, subreddit).then(posts => dispatch(receivePosts(posts)))
);
