import React from 'react';

import ParticipantService from "../services/ParticipantService";
import TableComponent from "../components/common/table/TableComponent";

import "../styles/styles.scss";

export class ParticipantsViewComponent extends React.Component {

  participants = [];
  columns = [{key:1, value: "id"}, {key:2, value: "name"},{ key: 3, value: "email"}, {key: 4, value: "phone"}];
  editableRows = [{key:2, value: "name"},{ key: 3, value: "email"}, {key: 4, value: "phone"}];
  amountOfParticipants = 20;

  constructor() {
    super();
    this.p_service = ParticipantService;
  }

  componentDidMount() {
    this.participants = this.p_service.getParticipantList(this.amountOfParticipants);
    // console.log(this.participants);
  }

  renderTable = () => {
    console.log(this.participants);
    return (
      <div>
        <div className="title"><h1>Participants</h1></div>
        <div>
          <TableComponent
            tableData={this.participants}
            columns={this.columns}
            editableRows={this.editableRows}>
          </TableComponent>
        </div>
      </div>
      
    );
  }

  render() {
    return (
      <div className="participant-view">
        {this.renderTable()}
      </div>
    );
  }
}