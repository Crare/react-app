import React from 'react';

import "../../styles/styles.scss";

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <div className="logo"></div>
        <h1>{this.props.text}</h1>
      </div>
    );
  }
}