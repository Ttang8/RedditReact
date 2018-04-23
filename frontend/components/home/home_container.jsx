import { connect } from 'react-redux';
import Home from './home';
import { requestPosts, clearPosts, scrapeImgur } from '../../actions/post_actions';
import { selectAllPosts, selectImgurUrl } from '../../reducers/selectors';

const mapStateToProps = ({posts, imgurUrl}) => {
  return {
    posts: selectAllPosts(posts),
    imgurUrl: selectImgurUrl(imgurUrl)
  };
};

const mapDispatchToProps = dispatch => ({
  requestPosts: (afterString, postCount, subreddit) => dispatch(requestPosts(afterString, postCount, subreddit)),
  clearPosts: () => dispatch(clearPosts()),
  scrapeImgur: (url) => dispatch(scrapeImgur(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
