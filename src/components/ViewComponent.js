import React from 'react';

import { Edit, Delete } from '@material-ui/icons';

import Table from './common/table/Table';
import { TableColumnData, TableColumnDataType } from './common/table/TableColumnData';
import ParticipantService from '../services/ParticipantService';

export default class ViewComponent extends React.Component {

  amountOfParticipants = 20;

  constructor() {
    super();
    this.p_service = ParticipantService;
  }

  componentDidMount() {
    this.setState({
      columns: [
        new TableColumnData().fromObject({ headerText: "name", dataColumn: "name", type: TableColumnDataType.EDITABLE_TEXT, showText: true }),
        new TableColumnData().fromObject({ headerText: "email", dataColumn: "email", type: TableColumnDataType.EDITABLE_TEXT, showText: true }),
        new TableColumnData().fromObject({ headerText: "phone", dataColumn: "phone", type: TableColumnDataType.EDITABLE_TEXT, showText: true }),
        new TableColumnData().fromObject({ headerText: "edit", dataColumn: "", type: TableColumnDataType.COMPONENT, showText: false, component: <Edit/> }),
        new TableColumnData().fromObject({ headerText: "delete", dataColumn: "", type: TableColumnDataType.COMPONENT, showText: false, component: <Delete/>})
      ]
    });
    let participants = this.p_service.getParticipantList(this.amountOfParticipants);
    this.setState({data: participants})
  }

  columnHeadClicked(event) {
    console.log("columnHeadClicked:", event);
  }

  rowClicked(event) {
    console.log("rowClicked:", event);
  }

  columnClicked(event) {
    console.log("columnClicked:", event);
  }

  buttonClicked(event) {
    console.log("buttonClicked:", event);
  }

  render() {
    if (this.state) {
      return (
        <Table
          columns={this.state.columns}
          data={this.state.data}
          columnHeadClicked={(data) => this.columnHeadClicked(data)}
          rowClicked={(data) => this.rowClicked(data)}
          columnClicked={(data) => this.columnClicked(data)}
          buttonClicked={(data) => this.buttonClicked(data)}>
        </Table>
      );
    }
    return (
      <div>
        no state!
      </div>
    );
  }
}