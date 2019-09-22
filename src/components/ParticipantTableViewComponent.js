import React from 'react';

import { Edit, Delete } from '@material-ui/icons';

import Table from './common/table/Table';
import { TableColumnData, TableColumnDataType } from './common/table/TableColumnData';
import ParticipantService from '../services/ParticipantService';
import Form from "./common/Form";
import { InputValidationType } from "../services/Validator";

import "../styles/styles.scss";
import Participant from '../dto/Participant';


/**
 * Renders form and table for handling participants
 */
export default class ParticipantTableViewComponent extends React.Component {

  amountOfParticipants = 20;

  constructor(props) {
    super(props);
    this.p_service = new ParticipantService();

    this.rowClicked = this.rowClicked.bind(this);
    this.columnClicked = this.columnClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.columnValueChanged = this.columnValueChanged.bind(this);

    this.formValueChanged = this.formValueChanged.bind(this);
  }

  componentDidMount() {
    this.setNewInputFields();

    this.setState({
      columns: [
        new TableColumnData().fromObject({ headerText: "Name", dataColumn: "name", type: TableColumnDataType.EDITABLE_TEXT, showText: true, sortable: true }),
        new TableColumnData().fromObject({ headerText: "E-mail address", dataColumn: "email", type: TableColumnDataType.EDITABLE_TEXT, showText: true, sortable: true }),
        new TableColumnData().fromObject({ headerText: "Phone number", dataColumn: "phone", type: TableColumnDataType.EDITABLE_TEXT, showText: true, sortable: true }),
        new TableColumnData().fromObject({ headerText: "edit", dataColumn: "id", type: TableColumnDataType.COMPONENT, showText: false, component: <Edit />, sortable: false }),
        new TableColumnData().fromObject({ headerText: "delete", dataColumn: "id", type: TableColumnDataType.COMPONENT, showText: false, component: <Delete />, sortable: false })
      ]
    });

    this.p_service.generateParticipants(this.amountOfParticipants, (participants) => {
      this.setState({ participants });
    });

    this.setState({ sortByColumn: "name", sortAscending: false });
    this.setState({ editRow: null });
    this.setState({ editableRow: null });
  }

  setNewInputFields() {
    this.setState({
      inputFields: [
        { type: InputValidationType.NAME, name: "name", value: "", placeholder: "Full name" },
        { type: InputValidationType.EMAIL, name: "email", value: "", placeholder: "E-mail address" },
        { type: InputValidationType.PHONE, name: "phone", value: "", placeholder: "Phone number" },
      ]
    });
  }


  getParticipants() {
    this.p_service.getParticipantList((participants) => {
      this.setState({ participants });
    });
  }

  sortByColumn({ clickEvent, data }) {
    // console.log("sortByColumn:", { clickEvent, data });
    if (data.sortable) {
      let participants = this.state.participants;
      const compare = (a, b, attr) => {
        if (a[attr] < b[attr]) {
          return 1;
        }
        if (a[attr] > b[attr]) {
          return -1;
        }
        return 0;
      }
      const compareOpposite = (a, b, attr) => {
        if (a[attr] < b[attr]) {
          return -1;
        }
        if (a[attr] > b[attr]) {
          return 1;
        }
        return 0;
      }
      // toggle direction
      if (this.state.sortByColumn === data.dataColumn) {
        this.setState({ sortAscending: !this.state.sortAscending });
      } else {
        this.setState({ sortAscending: false });
      }
      if (this.state.sortAscending) {
        participants.sort((a, b) => compareOpposite(a, b, data.dataColumn));
      } else {
        participants.sort((a, b) => compare(a, b, data.dataColumn));
      }
      this.setState({ participants, sortByColumn: data.dataColumn });
    }
  }

  rowClicked({ clickEvent, rowData, rowKey }) {
    // console.log("rowClicked:", { clickEvent, rowData, rowKey });
  }

  columnClicked({ clickEvent, data }) {
    // console.log("columnClicked:", { clickEvent, data });
    switch (data.headerText) {
      case "delete":
        this.deleteParticipant(data.dataColumn);
        break;
      case "edit": // TODO:
        this.toggleEditParticipant(data.dataColumn);
        break;
      default:
        break;
    }
  }

  buttonClicked({ buttonClickEvent, data }) {
    // console.log("buttonClicked:", { buttonClickEvent, data });
  }

  fieldsToParticipant() {
    let participant = new Participant();
    this.state.inputFields.forEach((field) => {
      participant[field.name] = field.value;
    })
    return participant;
  }

  toggleEditParticipant(participantId) {
    console.log("toggleEditParticipant, participantId: ", participantId);
    if (this.state.editableRow === participantId) {
      this.setState({ editableRow: null });
    } else {
      this.setState({ editableRow: participantId });
    }
  }

  deleteParticipant(participantId) {
    this.p_service.deleteParticipant(participantId, (response) => {
      if (response === "success") {
        this.getParticipants();
      } else {
        console.error(response);
      }
    });
  }

  addNewParticipant() {
    let newParticipant = this.fieldsToParticipant();
    this.p_service.addNewParticipant(newParticipant, (response) => {
      if (response === "success") {
        this.getParticipants();
        this.setNewInputFields();
      }
    });
  }

  formValueChanged({ value, name }) {
    let inputFields = this.state.inputFields;
    inputFields.map((field) => {
      if (field.name === name) {
        field.value = value;
      }
      return field;
    });
    this.setState({ inputFields });
  }

  columnValueChanged({ value, name, data }) {
    console.log("columnValueChanged", { value, name, data });
    // this.state.participants.map((p) => {
    //   p.
    // });
    // let inputFields = this.state.inputFields;
    // inputFields.map((field) => {
    //   if (field.name === name) {
    //     field.value = value;
    //   }
    //   return field;
    // });
    // this.setState({ inputFields });
  }

  renderTable() {
    if (this.state.participants) {
      return (
        <Table
          columns={this.state.columns}
          data={this.state.participants}
          columnHeadClicked={(event) => this.sortByColumn(event)}
          rowClicked={this.rowClicked}
          columnClicked={this.columnClicked}
          buttonClicked={this.buttonClicked}
          sortByColumn={this.state.sortByColumn}
          sortAscending={this.state.sortAscending}
          editableRow={this.state.editableRow}
          columnValueChanged={this.columnValueChanged} />);
    }
    return (<div>Loading participants...</div>);
  }

  render() {
    if (this.state) {
      return (
        <div className="participants-table-view fixed-width-container">
          <h2 className="title">List of participants</h2>
          <Form
            fields={this.state.inputFields}
            valueChanged={this.formValueChanged}
            buttonClicked={() => this.addNewParticipant()} />
          {this.renderTable()}
        </div>
      );
    }
    return (
      <div>
        loading...
      </div>
    );
  }
}