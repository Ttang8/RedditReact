export const selectAllPosts = (posts) => {
  let arr = Object.keys(posts).map((id) => (posts[id]));
  return arr;
};
