import React from 'react';
import { TableColumnDataType } from './TableColumnData';
import Button from '../Button';

export default class TableColumn extends React.Component {

  columnHeadClicked(data) {
    this.props.columnHeadClicked(data);
  }
  
  columnClicked(data) {
    this.props.columnClicked(data);
  }

  buttonClicked(data) {
    this.props.buttonClicked(data);
  }

  renderColumn() {
    const { data } = this.props;
    if (data.showText) {
      if (data.type === TableColumnDataType.HEAD) {
        return data.headerText
      } else if (data.type === TableColumnDataType.TEXT || data.type === TableColumnDataType.EDITABLE_TEXT) {
        return data.dataColumn
      } else if (data.type === TableColumnDataType.BUTTON) {
        return <Button buttonClicked={(buttonData) => this.buttonClicked(buttonData)}>{data.headerText}</Button>
      }
    }
    if (data.type === TableColumnDataType.BUTTON) {
      return <Button buttonClicked={(buttonData) => this.buttonClicked(buttonData)}>{data.headerText}</Button>
    }
    // return data.headerText;
  }

  render() {
    const { data, } = this.props;
    if (data.type === TableColumnDataType.HEAD) {
      return (
        <th onClick={() => this.columnHeadClicked(data)}>
          {this.renderColumn()}
        </th>
      );
    } else {
      return (
        <td onClick={() => this.columnClicked(data)}>
          {this.renderColumn()}
        </td>
      );
    }
  }

}