import React from 'react';

export default class Button extends React.Component {

  buttonClicked(data) {
    this.props.buttonClicked(data);
  }

  render() {
    return <button onClick={(buttonData) => this.buttonClicked({buttonClickEvent: buttonData, data: this.props.data})}>{this.props.children}</button>
  }
}