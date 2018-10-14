import React, {Component} from 'react';
import HomeContainer from '../home/home_container';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subreddit: "",
      title: "all"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field){
    return event => this.setState({[field]: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let permSub = this.state.subreddit;
    this.props.clearPosts();
    this.props.requestPosts(undefined,25,this.state.subreddit)
      .then(this.setState({title: permSub}));
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Subreddit" type="text" autoFocus="autofocus" value={this.state.subreddit} onChange={this.update('subreddit')}></input>
          <input type="submit" value="Submit"></input>
        </form>
        <h1>{this.state.title}</h1>
        <HomeContainer subreddit={this.state.title} update={this.update}/>
      </div>
    );
  }
}

export default Header;
