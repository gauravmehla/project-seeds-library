import React, { Component } from 'react';
require('./global.scss');

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Hello React</h1>
      </div>
    );
  }
}
