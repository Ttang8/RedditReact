import { connect } from 'react-redux';
import Home from './home';
import { requestPosts, clearPosts, scrapeImgur } from '../../actions/post_actions';
import { selectAllPosts, selectImgurUrl } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  return {
    posts: selectAllPosts(state.posts),
    imgurUrl: selectImgurUrl(state.imgurUrl),
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
