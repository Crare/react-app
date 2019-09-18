import React from 'react';

import "../../styles/styles.scss";

export default class Button extends React.Component {

  buttonClicked(data) {
    this.props.buttonClicked(data);
  }

  render() {
    const { styles, data, children } = this.props;
    return (
      <button style={styles} className="button"
        onClick={(buttonData) => this.buttonClicked(
          { buttonClickEvent: buttonData, data }
        )}>
        {children}
      </button>
    );
  }
}