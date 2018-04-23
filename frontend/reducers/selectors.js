export const selectAllPosts = (posts) => {
  let arr = Object.keys(posts).map((id) => (posts[id]));
  return arr;
};

export const selectImgurUrl = (result) => {
  if (result === "") {
    return "";
  } else {
    let htmlString = $(result);
    let imageUrl = htmlString.find('.post-image');
    let imageSrc = imageUrl[0].children[0];
    if (imageSrc.src) {
      console.log('src', imageSrc.src);
      return imageSrc.src;
    } else if (imageSrc.href) {
      console.log('href', JSON.stringify(imageSrc.href).slice(5));
      return JSON.stringify(imageSrc.href);
    }
  }
};
