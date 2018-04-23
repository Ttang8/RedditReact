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
      subreddit: undefined,
      array: []
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.debounce = this.debounce.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNSFW = this.handleNSFW.bind(this);
  }

  componentDidMount () {
    this.props.requestPosts()
      .then(() => this.handleAfter())
      .then(() => this.createArray());
    // window.addEventListener('scroll', this.debounce(this.handleScroll));
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick (e) {
    e.preventDefault();
    this.props.requestPosts(this.state.afterString, this.props.posts.length, this.state.title)
      .then(() => this.handleAfter())
      .then(() => this.createArray());
  }

  handleSubmit(e) {
    e.preventDefault();
    let permSub = this.state.subreddit;
    this.props.clearPosts();
    this.props.requestPosts(undefined,25,this.state.subreddit)
      .then(this.setState({title: permSub}))
      .then(this.setState({subreddit: undefined}))
      .then(() => this.handleAfter())
      .then(() => this.createArray());
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

  createArray() {
    let array = this.props.posts.map((post) => {
      if (post.data.url.includes('png') || post.data.url.includes('jpg') || post.data.url.includes('gif') || post.data.url.includes('gfycat')) {
        return post.data.url;
      } else if (post.data.url.includes('imgur')) {
        // let imgrurl = post.data.url;
        // let newurl = this.props.scrapeImgur(imgrurl)
        //   .then(() => {
        //     console.log('hit over here', this.props.imgurUrl);
        //     let string = this.props.imgurUrl;
        //     let index = string.indexOf('i.imgur');
        //     let url = string.slice(index);
        //     console.log('url',("https://" + url));
        //     let newurl2 =  ("https://" + url);
        //     return newurl2;
          // });
          // return newurl;
          return post.data.thumbnail;
      } else {
        return post.data.thumbnail;
      }
    });
    Promise.all(array)
      .then((results) => {
        this.setState({array: results});
      });
    console.log('array',this.state.array);
  }

  renderPosts () {
    console.log('render array',this.state.array);
    let posts = this.state.array.map((post,idx) => {
      // if (!this.state.viewNsfw) {
      //   if (post.data.parent_whitelist_status) {
      //     if (post.data.parent_whitelist_status.includes('nsfw')) {
      //       return;
      //     }
      //   }
      // }
      if (post === undefined) {
        return;
      }
      if (post.includes('png') || post.includes('jpg')) {
        return(
          <li className="image deactive" key={idx}>
            <img src={post}></img>
          </li>
        );
      } else if (post.includes('gfycat')) {
        let index;
        if (post.includes('detail/')) {
          index = post.indexOf('detail/') + 7;
        } else {
          index = post.indexOf('.com/') + 5;
        }
        let gfyurl = "https://giant.gfycat.com/" + post.slice(index) + ".mp4";
          return(
            <li className="image deactive" key={idx}>
              <video autoPlay controls loop src={gfyurl}></video>
            </li>
          );
        } else if (post.includes('gif')){
        if (post[post.length-1] === 'v') {
          let index = post.indexOf('.gifv');
          let videourl = post.slice(0, index) + ".mp4";
          return(
            <li className="image deactive" key={idx}>
              <video autoPlay controls loop src={videourl}></video>
            </li>
          );
        } else {
          return(
            <li className="image deactive" key={idx}>
              <img src={post}></img>
            </li>
          );
        }
      } else if (post.includes('imgur')) {
        let imgrurl = post;
        this.props.scrapeImgur(imgrurl)
          .then(() => {
            let string = this.props.imgurUrl;
            let index = string.indexOf('i.imgur');
            let url = string.slice(index);
            console.log('url',url);
        return(
          <li className="image deactive" key={idx}>
            <img src={url}></img>
          </li>
        );
      });
      }else {
        return;
      }
    });
    return posts;
  }

  handleImagesLoaded(images) {
    // console.log('hit handle images loaded',images);
    // setTimeout(() => images.elements[0].childNodes.forEach(img => {
    //   img.className = "image active";
    // }), 2000);
  }

  handleLayoutComplete(laidoutitems) {
    console.log('hit layout complete');
    setTimeout(() => laidoutitems.forEach(img => {
      img.element.className = "image active";
    }), 2000);
  }

  render () {
    if (this.props.posts[0]) {
      return (
        <div>
          <div className="search-bar">
            <form onSubmit={this.handleSubmit}>
              <input placeholder="Subreddit" type="text" autoFocus="autofocus" value={this.state.subreddit} onChange={this.update('subreddit')}></input>
              <input type="submit" value="Submit"></input>
            </form>
            <button onClick={this.handleNSFW} >{this.state.viewNsfw? "nsfw on" : "nsfw off"}</button>
          </div>
          <h1>{this.state.title}</h1>
          <div className="gallery-container">
            <Masonry
              className={'my-gallery-class'}
              elementType={'ul'}
              options={masonryOptions}
              onImagesLoaded={images => this.handleImagesLoaded(images)}
              onLayoutComplete={laidOutItems => this.handleLayoutComplete(laidOutItems)}
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
