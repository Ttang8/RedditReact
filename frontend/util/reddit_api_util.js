export const requestPosts = (afterString = "", postCount = "") => (
  $.ajax({
    method: 'GET',
    url: `https://www.reddit.com/r/all.json?limit=25&after=${afterString}&count=${postCount}`,
    dataType: "json"
  })
);
