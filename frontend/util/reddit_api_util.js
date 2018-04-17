export const requestPosts = (afterString = "", postCount = "", subreddit = "all") => (
  $.ajax({
    method: 'GET',
    url: `https://www.reddit.com/r/${subreddit}.json?limit=25&after=${afterString}&count=${postCount}`,
    dataType: "json"
  })
);
