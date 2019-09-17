import React from 'react';

import "./headerStyles.scss";

/**
 * props: title
 * @param title text shown
 */
export default class Header extends React.Component {

  render() {
    return (
      <div className="header-view">
        <div className="header-title">{this.props.title}</div>
      </div>
    );
  }

}