import React from 'react';

import { connect } from 'react-redux';

import { Edit, Delete, ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { fetchParticipants, deleteParticipant } from '../actions';

class ParticipantList extends React.Component {

  sortBy = "";
  sortAscending = true;

  componentDidMount() {
    this.props.fetchParticipants({});
  }

  addHeaderSortStyling(sort) {
    return this.sortBy === sort ? ' list-header-sortby' : '';
  }

  renderHeader() {
    return (
      <div className="list-header">
        <div className={'list-header-item flex-width-2' + this.addHeaderSortStyling("name")} onClick={() => this.sortByColumn("name")}>
          Name {this.renderSortIcon("name")}
        </div>
        <div className={'list-header-item flex-width-3' + this.addHeaderSortStyling("email")} onClick={() => this.sortByColumn("email")}>
          E-mail address {this.renderSortIcon("email")}
        </div>
        <div className={'list-header-item flex-width-2' + this.addHeaderSortStyling("phone")} onClick={() => this.sortByColumn("phone")}>
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
        return <div className="icon-container"><ArrowUpward className="icon" /></div>
      }
      return <div className="icon-container"><ArrowDownward className="icon" /></div>
    }
  }

  sortByColumn(dataValue) {
    if (dataValue === this.sortBy) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
    }
    this.props.fetchParticipants({ filter: { sortByColumn: dataValue, sortAscending: this.sortAscending } });
    this.sortBy = dataValue;
  }

  editRow(participantId) {
    console.log("editRow, participantId:", participantId);
  }

  deleteParticipant(participantId) {
    this.props.deleteParticipant({ participantId });
  }

  renderItems() {
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

  renderList() {
    if (this.props.participants) {
      return (
        <div className="list">
          {this.renderHeader()}
          {this.renderItems()}
        </div>
      );
    } else if (this.props.loading) {
      return (
        <span>Loading participants...</span>
      );
    } else {
      return <span>Error loading content. Try again later.</span>
    }
  }

  render() {
    return (
      <div className="participants-view">
        {this.renderList()}
      </div>
    );
  }
}



const mapStateToProps = state => {
  if (state.participantReducer) {
    return state.participantReducer;
  }
  return {};
};

export default connect(mapStateToProps, { fetchParticipants, deleteParticipant })(ParticipantList);