import React from 'react';

import { connect } from 'react-redux';

import { Edit, Delete, ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { fetchParticipants, deleteParticipant, updateParticipant } from '../actions';

class ParticipantList extends React.Component {

  filter = { sortAscending: true, sortByColumn: "" };

  componentDidMount() {
    this.props.fetchParticipants({ filter: this.filter });
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
    if (this.filter.sortByColumn === dataValue) {
      if (this.filter.sortAscending) {
        return <div className="icon-container"><ArrowUpward className="icon" /></div>
      }
      return <div className="icon-container"><ArrowDownward className="icon" /></div>
    }
  }

  sortByColumn(dataValue) {
    if (dataValue === this.filter.sortByColumn) {
      this.filter.sortAscending = !this.filter.sortAscending;
    } else {
      this.filter.sortAscending = true;
    }
    this.filter = { ...this.filter, sortByColumn: dataValue, };
    this.props.fetchParticipants({ filter: this.filter });
  }

  editRow(participantId) {
    console.log("editRow, participantId:", participantId);
    let participants = this.props.participants;
    participants.map((p) => {
      if (p.id === participantId) {
        p.edit = true;
      } else {
        p.edit = false;
      }
      return p;
    });
    this.setState({ participants });
  }

  deleteParticipant(participantId) {
    this.props.deleteParticipant({ participantId });
  }

  handleInputChange(participant, property, newValue) {
    let participants = this.props.participants;
    participants.map((p) => {
      if (p.id === participant.id) {
        p[property] = newValue;
      }
      return p;
    });
    this.setState({ participants });
  }

  renderItemContent(participant, property, placeholder) {
    if (participant.edit) {
      return (
        <input
          name={property}
          value={participant[property]}
          placeholder={placeholder}
          onChange={(newValue) => this.handleInputChange(participant, property, newValue.target.value)} />
      );
    }
    return (
      <span>{participant[property]}</span>
    )
  }

  cancelEdit() {
    // let participants = this.props.participants;
    // participants.map((p) => {
    //   p.edit = false;
    //   return p;
    // });
    // this.setState({ participants });
    this.props.fetchParticipants({ filter: this.filter });
    this.setState({ participants: this.props.participants });
  }

  updateParticipant(participant) {
    console.log("updateParticipant", participant);
    this.props.updateParticipant({ participant });
  }

  renderRowOptions(participant) {
    if (participant.edit) {
      return (
        <span>
          <button className="button-blue-text" onClick={() => this.cancelEdit()}>Cancel</button>
          <button className="button-blue" onClick={() => this.updateParticipant(participant)}>Save</button>
        </span>
      );
    }
    return (
      <span>
        <Edit className="edit" onClick={() => this.editRow(participant.id)} />
        <Delete className="delete" onClick={() => this.deleteParticipant(participant.id)} />
      </span>
    );
  }

  renderItems() {
    return (
      <div className="list-items">
        {
          this.props.participants.map((p) => {
            return (
              <div key={p.id} className="list-item">
                <div className="list-item-property flex-width-2">
                  {this.renderItemContent(p, 'name', 'Full name')}
                </div>
                <div className="list-item-property flex-width-3">
                  {this.renderItemContent(p, 'email', 'E-mail address')}
                </div>
                <div className="list-item-property flex-width-2">
                  {this.renderItemContent(p, 'phone', 'Phone number')}
                </div>
                <div className="list-item-property flex-width-2 right no-padding" >
                  {this.renderRowOptions(p)}
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
  console.log("mapStateToProps, state", state);
  if (state.participantReducer) {
    return state.participantReducer;
  }
  return {};
};

export default connect(mapStateToProps, { fetchParticipants, deleteParticipant, updateParticipant })(ParticipantList);