import React from 'react';
import TableColumn from './TableColumn';
import { TableColumnData, TableColumnDataType } from './TableColumnData';

import "../../../styles/styles.scss";

/**
 * Table component
 * Renders dynamic table of given data.
 * 
 * props: columns, data.
 * @param columns prop. handles how content is show in columns. type of TableColumnDataType.
 * @param data prop. Data to be shown inside table.
 * events: rowClicked, columnHeadClicked, columnClicked, buttonClicked
 * @return rowClicked event
 * @return columnHeadClicked event
 * @return columnClicked event
 * @return buttonClicked event
 */
export default class Table extends React.Component {

  constructor(props) {
    super(props);

    this.rowClicked = this.rowClicked.bind(this);
    this.columnHeadClicked = this.columnHeadClicked.bind(this);
    this.columnClicked = this.columnClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.columnValueChanged = this.columnValueChanged.bind(this);
  }

  renderTableHead() {
    return (
      <thead>
        <tr className="table-head-row">
          {
            this.props.columns.map((col) => {
              let tableColumnData = new TableColumnData(col.headerText, col.dataColumn, TableColumnDataType.HEAD, col.showText, col.component, col.sortable);
              return (
                <TableColumn
                  key={col.headerText}
                  data={tableColumnData}
                  columnHeadClicked={this.columnHeadClicked}
                  sortByColumn={this.props.sortByColumn}
                  sortAscending={this.props.sortAscending}>
                </TableColumn>
              );
            })
          }
        </tr>
      </thead>
    );
  }

  renderTableBody() {
    return (
      <tbody>
        {
          this.props.data.map((data) => {
            return this.renderTableRow(data)
          })
        }
      </tbody>
    );
  }

  renderTableRow(rowData) {
    let rowKey = rowData['id'];
    return (
      <tr className="table-body-row" key={rowKey} onClick={(clickEvent) => this.rowClicked({ clickEvent, rowData, rowKey })}>
        {
          this.props.columns.map((col) => {
            let tableColumnData = new TableColumnData(col.headerText, rowData[col.dataColumn], col.type, col.showText, col.component);

            let colKey = rowData['id'] + "-" + col.headerText;
            return (
              <TableColumn
                key={colKey}
                data={tableColumnData}
                columnClicked={this.columnClicked}
                buttonClicked={this.buttonClicked}
                editableRow={this.props.editableRow === rowKey}
                columnValueChanged={this.columnValueChanged}>
              </TableColumn>
            );
          })
        }
      </tr>
    )
  }

  columnValueChanged({ value, name, data }) {
    this.props.columnValueChanged({ value, name, data });
  }

  columnClicked({ clickEvent, data }) {
    this.props.columnClicked({ clickEvent, data });
  }

  columnHeadClicked({ clickEvent, data }) {
    this.props.columnHeadClicked({ clickEvent, data });
  }

  rowClicked({ clickEvent, rowData, rowKey }) {
    this.props.rowClicked({ clickEvent, rowData, rowKey });
  }

  buttonClicked({ buttonClickEvent, data }) {
    this.props.buttonClicked({ buttonClickEvent, data });
  }

  render() {
    return (
      <table className="table">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </table>
    );
  }
}