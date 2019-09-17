import React from 'react';

import TableRowComponent from "./TableRowComponent";

import "../../../styles/styles.scss";

/**
 * props: renderData, editableRows, tableData
 * @param tableData object list of data to be handled.
 * @param columns string list of child variables to render.
 * @param editableRows string list of rows to be editable, have a click event.
 */
export default class TableComponent extends React.Component {

  renderHead() {
    let head = [];
    this.props.columns.forEach(col => {
      head.push(<th>{col.value}</th>);
    });
    return head;
  }

  renderBody() {
    let rows = [];
    console.log(this.props);
    console.log("this.props.tableData", this.props.tableData);
    this.props.tableData.forEach(row => {
      console.log("row:", row);
      rows.push(<tr><td>hello</td></tr>);
    })
    console.log("rows:", rows);
    return rows;
  }

  render() {
    return (
      <table className="table-component">
        <thead><tr>{this.renderHead()}</tr></thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    );
  }
}