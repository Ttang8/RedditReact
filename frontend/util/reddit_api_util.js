export const requestPosts = (afterString = "") => (
  $.ajax({
    method: 'GET',
    url: `https://www.reddit.com/r/all.json?limit=25&after=${afterString}`,
    dataType: "json"
  })
);
