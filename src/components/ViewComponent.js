import React from 'react';

import Table from './common/table/Table';
import { TableColumnDataType } from './common/table/TableColumnData';
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
        { headerText: "name", dataColumn: "name", type: TableColumnDataType.EDITABLE_TEXT, showText: true },
        { headerText: "email", dataColumn: "email", type: TableColumnDataType.EDITABLE_TEXT, showText: true },
        { headerText: "phone", dataColumn: "phone", type: TableColumnDataType.EDITABLE_TEXT, showText: true },
        { headerText: "edit", dataColumn: "", type: TableColumnDataType.BUTTON, showText: false },
        { headerText: "delete", dataColumn: "", type: TableColumnDataType.BUTTON, showText: false }
      ]
    });
    let participants = this.p_service.getParticipantList(this.amountOfParticipants);
    console.log(participants);
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