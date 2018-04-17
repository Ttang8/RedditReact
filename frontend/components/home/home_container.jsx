import { connect } from 'react-redux';
import Home from './home';
import { requestPosts, clearPosts} from '../../actions/post_actions';
import { selectAllPosts } from '../../reducers/selectors';

const mapStateToProps = ({posts}) => {
  return {
    posts: selectAllPosts(posts)
  };
};

const mapDispatchToProps = dispatch => ({
  requestPosts: (afterString, postCount, subreddit) => dispatch(requestPosts(afterString, postCount, subreddit)),
  clearPosts: () => dispatch(clearPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
