import React from 'react';

import "../../styles/styles.scss";

/**
 * props: name, value, placeholder
 * events: valueChanged
 */
export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.valueChanged = this.valueChanged.bind(this);
  }

  valueChanged(event) {
    this.setState({ value: event.target.value });
    this.props.valueChanged({ value: this.state.value, name: this.props.name });
  }

  render() {
    const { name, placeholder } = this.props;

    return (
      <input
        className="input-field"
        name={name}
        value={this.state.value}
        placeholder={placeholder}
        onChange={this.valueChanged} />
    );
  }
}