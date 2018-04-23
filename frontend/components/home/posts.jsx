import React, { Component } from 'react';

class WholePost extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log('wholepost', this.props);
    return (
      <div>
        hello
      </div>
    );
  }
}

export default WholePost;
