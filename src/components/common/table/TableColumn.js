import React from 'react';
import { TableColumnDataType } from './TableColumnData';
import Button from '../Button';

import "../../../styles/styles.scss";


/**
 * Handles rendering single column on table
 * 
 * props: data
 * @param data prop. Type of TableColumnDataType.
 * 
 * @returns columnHeadClicked event
 * @returns columnClicked event
 * @returns buttonClicked event
 */
export default class TableColumn extends React.Component {

  constructor(props) {
    super(props);

    this.columnHeadClicked = this.columnHeadClicked.bind(this);
    this.columnClicked = this.columnClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

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
    if (data.type === TableColumnDataType.HEAD && data.showText) {
      return data.headerText

    } else if (data.type === TableColumnDataType.TEXT || data.type === TableColumnDataType.EDITABLE_TEXT) {
      return data.dataColumn;

    } else if (data.type === TableColumnDataType.BUTTON) {
      return <Button data={data} buttonClicked={this.buttonClicked}>{data.headerText}</Button>

    } else if (data.type === TableColumnDataType.COMPONENT) {
      return (<div>{data.component}</div>);
    }
  }

  render() {
    const { data, } = this.props;
    if (data.type === TableColumnDataType.HEAD) {
      return (
        <th className="table-head-col" onClick={this.columnHeadClicked}>
          {this.renderColumn()}
        </th>
      );
    } else {
      return (
        <td className="table-body-col" onClick={this.columnClicked}>
          {this.renderColumn()}
        </td>
      );
    }
  }

}