import React from 'react';

import "../../styles/styles.scss";

export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(buttonClickEvent) {
    this.props.buttonClicked({ buttonClickEvent, data: this.props.data });
  }

  render() {
    const { styles, children } = this.props;
    return (
      <button style={styles} className="button"
        onClick={this.buttonClicked}>
        {children}
      </button>
    );
  }
}