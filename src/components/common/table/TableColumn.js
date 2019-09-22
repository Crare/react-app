import React from 'react';
import { TableColumnDataType } from './TableColumnData';
import Button from '../Button';
import Input from '../Input';

import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

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
    this.columnValueChanged = this.columnValueChanged.bind(this);
  }

  columnHeadClicked(clickEvent) {
    this.props.columnHeadClicked({ clickEvent, data: this.props.data });
  }

  columnClicked(clickEvent) {
    this.props.columnClicked({ clickEvent, data: this.props.data });
  }

  buttonClicked(buttonClickEvent) {
    this.props.buttonClicked({ buttonClickEvent, data: this.props.data });
  }

  renderColumn() {
    const { data } = this.props;
    if (data.type === TableColumnDataType.HEAD && data.showText) {
      return (this.renderWithSorting(data.headerText));

    } else if (data.type === TableColumnDataType.TEXT) {
      return (<div>{data.dataColumn}</div>);
    } else if (data.type === TableColumnDataType.EDITABLE_TEXT) {
      if (this.props.editableRow) {
        return (<Input
          key={data.name}
          name={data.name}
          value={data.dataColumn}
          valueChanged={this.columnValueChanged}
        />);
      }
      return (<div>{data.dataColumn}</div>);
    } else if (data.type === TableColumnDataType.BUTTON) {
      return (<Button data={data} buttonClicked={this.buttonClicked}>{data.headerText}</Button>);

    } else if (data.type === TableColumnDataType.COMPONENT) {
      return (<div>{data.component}</div>);
    }
  }

  columnValueChanged({ value, name }) {
    this.props.columnValueChanged({ value, name, data: this.props.data });
  }

  renderWithSorting(text) {
    if (this.props.sortByColumn === this.props.data.dataColumn) {
      if (this.props.sortAscending) {
        return (<div className="column-head-sort">{text}<div><ArrowDownward /></div></div>);
      } else {
        return (<div className="column-head-sort">{text}<div><ArrowUpward /></div></div>);
      }
    }
    return (<div>{text}</div>);
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