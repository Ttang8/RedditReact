import { connect } from 'react-redux';
import Home from './home';
import { requestPosts } from '../../actions/post_actions';
import { selectAllPosts } from '../../reducers/selectors';

const mapStateToProps = ({posts}) => {
  return {
    posts: selectAllPosts(posts)
  };
};

const mapDispatchToProps = dispatch => ({
  requestPosts: () => dispatch(requestPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
