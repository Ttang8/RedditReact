import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import WholePost from './posts';
import GifPlayer from 'react-gif-player';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewPosts: false,
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
    this.createArray = this.createArray.bind(this);
    this.toggleViewPosts = this.toggleViewPosts.bind(this);
  }

  componentDidMount () {
    this.props.requestPosts(this.state.afterString, this.props.posts.length, this.state.title)
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
    this.props.clearPosts().then(
    () => this.props.requestPosts(undefined,25,this.state.subreddit)
      .then(this.setState({title: permSub}))
      .then(this.setState({subreddit: undefined}))
      .then(() => this.handleAfter())
      .then(() => this.createArray())
    );
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
      // if (!this.state.viewNsfw) {
      //   if (post.data.parent_whitelist_status) {
      //     if (post.data.parent_whitelist_status.includes('nsfw')) {
      //       return "nsfw";
      //     }
      //   }
      // }
      if (post.data.url.includes('png') || post.data.url.includes('jpg') || post.data.url.includes('gif') || post.data.url.includes('gfycat')) {
        return post.data.url;
      } else if (post.data.url.includes('imgur')) {
        // let imgrurl = post.data.url;
        // let newurl = this.props.scrapeImgur(imgrurl)
        //   .then(() => {
        //     let string = this.props.imgurUrl;
        //     let index = string.indexOf('i.imgur');
        //     let url = string.slice(index);
        //     let newurl2 =  ("https://" + url);
        //     return newurl2;
          // });
          // return newurl;
          return post.data.thumbnail;
      } else {
        return post.data.thumbnail;
      }
    });
    // Promise.all(array)
    //   .then((results) => {
        this.setState({array: array});
      // });
  }

  handleReddit(e) {
    e.preventDefault();
    window.open(e.target.dataset.link, '_blank');
  }

  renderPosts () {
    let posts = this.state.array.map((post,idx) => {
      if (!this.state.viewNsfw) {
        if (this.props.posts[idx]) {
          if (this.props.posts[idx].data.parent_whitelist_status) {
            if (this.props.posts[idx].data.parent_whitelist_status.includes('nsfw')) {
              return;
            }
          }
        }
      }
      if (post === undefined) {
        return;
      }
      if (post.includes('png') || post.includes('jpg')) {
        return(
          <li className="image deactive" key={idx}>
            <a href={this.props.posts[idx].data.url} target="_blank">
              <div className="image_overlay">
                <div className="title_hover" onClick={this.handleReddit.bind(this)} data-link={`https://reddit.com${this.props.posts[idx].data.permalink}`}>
                  {this.props.posts[idx].data.title}
                </div>
              </div>
              <img src={post}></img>
            </a>
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
              <a href={this.props.posts[idx].data.url} target="_blank">
                <div className="image_overlay">
                  <div className="title_hover" onClick={this.handleReddit.bind(this)} data-link={`https://reddit.com${this.props.posts[idx].data.permalink}`}>
                    {this.props.posts[idx].data.title}
                  </div>
                </div>
                <video autoPlay loop poster={this.props.posts[idx].data.thumbnail}>
                  <source src={gfyurl} type="video/mp4"/>
                  <img src={this.props.posts[idx].data.thumbnail}></img>
                </video>
              </a>
            </li>
          );
        } else if (post.includes('gif')){
        if (post[post.length-1] === 'v') {
          let index = post.indexOf('.gifv');
          let videourl = post.slice(0, index) + ".mp4";
          return(
            <li className="image deactive" key={idx}>
              <a href={this.props.posts[idx].data.url} target="_blank">
                <div className="image_overlay">
                  <div className="title_hover" onClick={this.handleReddit.bind(this)} data-link={`https://reddit.com${this.props.posts[idx].data.permalink}`}>
                    {this.props.posts[idx].data.title}
                  </div>
                </div>
                <video autoPlay loop src={videourl}></video>
              </a>
            </li>
          );
        } else {
          return(
            <li className="image deactive" key={idx}>
              <a href={this.props.posts[idx].data.url} target="_blank">
                <div className="image_overlay">
                  <div className="title_hover" onClick={this.handleReddit.bind(this)} data-link={`https://reddit.com${this.props.posts[idx].data.permalink}`}>
                    this.props.posts[idx].data.title}
                  </div>
                </div>
                <img src={post}></img>
              </a>
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
        return(
          <li className="image deactive" key={idx}>
            <a href={this.props.posts[idx].data.url} target="_blank">
              <div className="image_overlay">
                <div className="title_hover" onClick={this.handleReddit.bind(this)} data-link={`https://reddit.com${this.props.posts[idx].data.permalink}`}>
                  {this.props.posts[idx].data.title}
                </div>
              </div>
              <img src={url}></img>
            </a>
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
    // setTimeout(() => images.elements[0].childNodes.forEach(img => {
    //   img.className = "image active";
    // }), 2000);
  }

  handleLayoutComplete(laidoutitems) {
    setTimeout(() => laidoutitems.forEach(img => {
      img.element.className = "image active";
    }), 1500);
  }

  toggleViewPosts(e) {
    e.preventDefault();
    if (this.state.viewPosts) {
      this.setState({viewPosts: false});
    } else {
      this.setState({viewPosts: true});
    }
  }

  render () {
    if (this.props.posts[0]) {
      if (this.state.viewPosts) {
        return(
          <div>
            <div className="header">
              <div className="search-bar">
                <form onSubmit={this.handleSubmit}>
                  <input placeholder="Subreddit" type="text" autoFocus="autofocus" value={this.state.subreddit} onChange={this.update('subreddit')}></input>
                  <input type="submit" value="Submit"></input>
                </form>
                <button onClick={this.handleNSFW} >{this.state.viewNsfw? "nsfw on" : "nsfw off"}</button>
              </div>
              <div className="flex_container">
                <h1>r/{this.state.title}</h1>
                <div>
                  <button className={`title_hover ${this.state.viewPosts? "":"bold"}`} onClick={this.toggleViewPosts}>Image Gallery</button>/
                  <button className={this.state.viewPosts? "bold":""}>List View</button>
                </div>
              </div>
            </div>
            <WholePost posts={this.props.posts}></WholePost>
          </div>
        );
      } else if (!this.state.viewPosts) {
        return (
          <div>
            <div className="header">
              <div className="search-bar">
                <form onSubmit={this.handleSubmit}>
                  <input placeholder="Subreddit" type="text" autoFocus="autofocus" value={this.state.subreddit} onChange={this.update('subreddit')}></input>
                  <input type="submit" value="Submit"></input>
                </form>
                <button onClick={this.handleNSFW} >{this.state.viewNsfw? "nsfw on" : "nsfw off"}</button>
              </div>
              <div className="flex_container">
                <h1>r/{this.state.title}</h1>
                <div>
                  <button className={this.state.viewPosts? "":"bold"}>Image Gallery</button>/
                  <button className={`title_hover ${this.state.viewPosts? "bold":""}`} onClick={this.toggleViewPosts}>List View</button>
                </div>
              </div>
            </div>
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
      }
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Home;
