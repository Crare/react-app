import React from 'react';

export default class TableRowComponent extends React.Component {

  render() {
    return (<td>{this.props.data}</td>);
  }
}