import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import GifPlayer from 'react-gif-player';

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
      if (post.data.url.includes('png') || post.data.url.includes('jpg')) {
        return(
          <li className="image" key={idx}>
            <img src={post.data.url}></img>
          </li>
        );
      } else if (post.data.url.includes('gif')){
        let videourl = post.data.url.replace('.gifv', '.mp4');
        return(
          <li className="image" key={idx}>
            <video autoPlay controls loop src={videourl}></video>
          </li>
        );
      } else {
        return;
      }
    });
    return posts;
  }

  render () {
    if (this.props.posts) {
      return (
        <div>
          <ul className="image_container cols">
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
