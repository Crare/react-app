import React from 'react';

import "../../styles/styles.scss";

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { name, placeholder } = this.props;

    return (
      <input
        className="input-field"
        name={name}
        value={this.state.value}
        placeholder={placeholder}
        onChange={this.handleChange} />
    );
  }
}