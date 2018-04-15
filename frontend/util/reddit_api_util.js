export const requestPosts = () => (
  $.ajax({
    method: 'GET',
    url: 'https://www.reddit.com/r/all.json?limit=25',
    dataType: "json"
  })
);
