import React from 'react';
import TableColumn from './TableColumn';
import { TableColumnData, TableColumnDataType } from './TableColumnData';

/**
 * Table component
 * props: columns, data, noTitle.
 * events: handleColumnHeadClick, handleRowClick, handleColumnClick
 * @param 
 */
export default class Table extends React.Component {

  renderTableHead() {
    return (
      <thead>
        <tr>
          {
            this.props.columns.map((col) => {
              let tableColumnData = new TableColumnData(col.headerText, col.dataColumn, TableColumnDataType.HEAD, col.showText);
              return(
                <TableColumn 
                  key={col.headerText} 
                  data={tableColumnData} 
                  columnHeadClicked={(data) => this.columnHeadClicked(data)}>
                </TableColumn>);
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
      <tr key={rowKey} onClick={() => this.rowClicked(rowData)}>
        {
          this.props.columns.map((col) => {
            let tableColumnData = new TableColumnData(col.headerText, rowData[col.dataColumn], col.type, col.showText);

            let colKey = rowData['id'] + "-" + col.headerText;
            return (
              <TableColumn
                key={colKey}
                data={tableColumnData}
                columnClicked={(columnData) => this.columnClicked(columnData)}
                buttonClicked={(buttonData) => this.buttonClicked(buttonData)}>
              </TableColumn>
            );
          })
        }
      </tr>
    )
  }

  columnClicked(data) {
    this.props.columnClicked(data);
  }

  columnHeadClicked(data) {
    this.props.columnHeadClicked(data);
  }

  rowClicked(data) {
    this.props.rowClicked(data);
  }

  buttonClicked(data) {
    this.props.buttonClicked(data);
  }

  render() {
    return (
      <table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </table>
    );
  }
}