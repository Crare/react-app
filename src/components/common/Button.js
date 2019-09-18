import React from 'react';

export default class Button extends React.Component {

  buttonClicked(data) {
    this.props.buttonClicked(data);
  }

  render() {
    return <button onClick={(buttonData) => this.buttonClicked(buttonData)}>{this.props.children}</button>
  }
}