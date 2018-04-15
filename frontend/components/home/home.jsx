import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
    this.props.requestPosts();
  }

  renderPosts () {
    let posts = this.props.posts.map((post,idx) => {
      return(
        <li key={idx}>
          <img src={post.data.url}></img>
        </li>
      );
    });
    return posts;
  }

  render () {
    console.log(this.props.posts);
    if (this.props.posts) {
      return (
        <div>
          <ul>
            {this.renderPosts()}
          </ul>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Home;
