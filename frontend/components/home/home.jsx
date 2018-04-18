import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import GifPlayer from 'react-gif-player';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0.5
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      afterString: "",
      viewNsfw: false,
      title: "all",
      subreddit: undefined
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.debounce = this.debounce.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNSFW = this.handleNSFW.bind(this);
  }

  componentDidMount () {
    this.props.requestPosts()
      .then(() => this.handleAfter());
    window.addEventListener('scroll', this.debounce(this.handleScroll));
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick (e) {
    e.preventDefault();
    this.props.requestPosts(this.state.afterString, this.props.posts.length, this.state.title)
      .then(() => this.handleAfter());
  }

  handleSubmit(e) {
    e.preventDefault();
    let permSub = this.state.subreddit;
    this.props.clearPosts();
    this.props.requestPosts(undefined,25,this.state.subreddit)
      .then(this.setState({title: permSub}))
      .then(() => this.handleAfter());
  }

  debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  handleScroll (e) {
    let scroll = e.path[1].scrollY + e.path[1].innerHeight;
    let windowHeight = document.body.offsetHeight;
    if (scroll > windowHeight-100) {
      console.log('hit');
    }
  }

  handleNSFW (e) {
    e.preventDefault();
    if (this.state.viewNsfw) {
      this.setState({viewNsfw: false});
    } else {
      this.setState({viewNsfw: true});
    }
  }

  handleAfter () {
    this.setState({afterString: this.props.posts[this.props.posts.length-1].data.name});
  }

  update(field){
    return event => this.setState({[field]: event.target.value});
  }

  renderPosts () {
    let posts = this.props.posts.map((post,idx) => {
      if (!this.state.viewNsfw) {
        if (post.data.parent_whitelist_status) {
          if (post.data.parent_whitelist_status.includes('nsfw')) {
            return;
          }
        }
      }
      if (post.data.url.includes('png') || post.data.url.includes('jpg')) {
        return(
          <li className="image" key={idx}>
            <img src={post.data.url}></img>
          </li>
        );
      } else if (post.data.url.includes('gif')){
        if (post.data.url[post.data.url.length-1] === 'v') {
          let index = post.data.url.indexOf('.gifv');
          let videourl = post.data.url.slice(0, index) + ".mp4";
          return(
            <li className="image" key={idx}>
              <video autoPlay controls loop src={videourl}></video>
            </li>
          );
        } else {
          return(
            <li className="image materialboxed" key={idx}>
              <img src={post.data.url}></img>
            </li>
          );
        }
      } else if (post.data.url.includes('imgur')) {
        let imgrurl = post.data.url + ".jpg";
        return(
          <li className="image" key={idx}>
            <img src={imgrurl}></img>
          </li>
        );
      }else {
        return;
      }
    });
    return posts;
  }

  render () {
    if (this.props.posts[0]) {
      return (
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input placeholder="Subreddit" type="text" autoFocus="autofocus" value={this.state.subreddit} onChange={this.update('subreddit')}></input>
              <input type="submit" value="Submit"></input>
            </form>
            <button onClick={this.handleNSFW} >{this.state.viewNsfw? "nsfw on" : "nsfw off"}</button>
            <h1>{this.state.title}</h1>
          </div>
          <div className="gallery-container">
            <Masonry
              className={'my-gallery-class'}
              elementType={'ul'}
              options={masonryOptions}
              >
              {this.renderPosts()}
            </Masonry>
            <div className="load-button">
              <button onClick={this.handleClick}>Load More</button>
            </div>
          </div>
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
