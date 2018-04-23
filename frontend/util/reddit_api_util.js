export const requestPosts = (afterString = "", postCount = "", subreddit = "all") => (
  $.ajax({
    method: 'GET',
    url: `https://www.reddit.com/r/${subreddit}.json?limit=25&after=${afterString}&count=${postCount}`,
    dataType: "json"
  })
);

export const scrapeImgur = (url) => (
  $.ajax({
    method: 'GET',
    url: `https://cors-anywhere.herokuapp.com/${url}`,
    dataType: 'html',
    crossDomain: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    jsonpCallback: "callback",
    success: {

    },
    error: function(httpReq,status,exception){
      console.log('httpReq', httpReq, status, exception);
    }
  }
));
