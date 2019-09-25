import React from 'react';


import { Edit, Delete, ArrowDownward, ArrowUpward } from '@material-ui/icons';

export default class ParticipantList extends React.Component {

  sortBy = "";
  sortAscending = false;

  componentDidMount() {
    console.log("ParticipantList componentDidMount props:", this.props);
  }

  componentDidUpdate() {
    console.log("ParticipantList componentDidUpdate:", this.props);
    this.render();
  }

  renderHeader() {
    return (
      <div className="list-header">
        <div className="list-header-item flex-width-2" onClick={this.sortByColumn("name")}>
          Name {this.renderSortIcon("name")}
        </div>
        <div className="list-header-item flex-width-3" onClick={this.sortByColumn("email")}>
          E-mail address {this.renderSortIcon("email")}
        </div>
        <div className="list-header-item flex-width-2" onClick={this.sortByColumn("phone")}>
          Phone number {this.renderSortIcon("phone")}
        </div>
        <div className="list-header-item flex-width-2">
        </div>
      </div>
    );
  }

  renderSortIcon(dataValue) {
    if (this.sortBy === dataValue) {
      if (this.sortAscending) {
        return <ArrowUpward />
      }
      return <ArrowDownward />
    }
  }

  sortByColumn(dataValue) {
    if (this.lastSort === dataValue) {
      this.sortAscending = !this.sortAscending;
    }

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

    if (this.sortAscending) {
      this.props.participants.sort((a, b) => compare(a, b, dataValue));
    } else {
      this.props.participants.sort((a, b) => compareOpposite(a, b, dataValue));
    }

    this.lastSort = dataValue;
  }

  editRow(participantId) {
    console.log("editRow, participantId:", participantId);

  }

  deleteParticipant(participantId) {
    console.log("deleteParticipant, participantId:", participantId);
  }

  renderItems() {
    console.log("renderItems called");
    return (
      <div className="list-items">
        {
          this.props.participants.map((p) => {
            return (
              <div key={p.id} className="list-item">
                <div className="list-item-property flex-width-2">{p.name}</div>
                <div className="list-item-property flex-width-3">{p.email}</div>
                <div className="list-item-property flex-width-2">{p.phone}</div>
                <div className="list-item-property flex-width-2 right no-padding" >
                  <Edit className="edit" onClick={() => this.editRow(p.id)} />
                  <Delete className="delete" onClick={() => this.deleteParticipant(p.id)} />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="list">
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    );
  }
}