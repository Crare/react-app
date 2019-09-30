import React from 'react';

import { connect } from 'react-redux';

import { Edit, Delete, ArrowDownward, ArrowUpward } from '@material-ui/icons';

import { fetchParticipants, deleteParticipant, updateParticipant, participantEmptyErrors } from '../actions';
import Participant from '../dto/Participant';

class ParticipantList extends React.Component {

  filter = { sortAscending: true, sortByColumn: "" };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchParticipants({ filter: this.filter });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editParticipant != null && this.props.editParticipant === null) {
      this.setState({ editParticipant: null });
    }
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
    const { editParticipant } = this.state;
    this.props.participants.forEach((p) => {
      if (p.id === participantId) {
        if (editParticipant && editParticipant.id === p.id) {
          this.setState({ editParticipant: null });
        } else {
          this.setState({ editParticipant: new Participant(p.id, p.name, p.email, p.phone) });
        }
      }
    });
  }

  deleteParticipant(participantId) {
    this.props.deleteParticipant({ participantId });
  }

  handleInputChange(property, newValue) {
    const { editParticipant } = this.state;
    editParticipant[property] = newValue;
    this.setState({ editParticipant });
  }

  renderItemContent(participant, property, placeholder) {
    const { editParticipant } = this.state;
    if (editParticipant && participant.id === editParticipant.id) {
      return (
        <input
          name={property}
          value={editParticipant[property]}
          placeholder={placeholder}
          onChange={(newValue) => this.handleInputChange(property, newValue.target.value)} />
      );
    }
    return (
      <span>{participant[property]}</span>
    )
  }

  cancelEdit() {
    this.setState({ editParticipant: null });
    this.props.participantEmptyErrors();
  }

  updateParticipant(participant) {
    if (participant.id === this.state.editParticipant.id) {
      this.props.updateParticipant({ participant: this.state.editParticipant });
    } else {
      console.error("wrong id: " + participant.id + " is not " + this.state.editParticipant.id);
    }
  }

  renderRowOptions(participant) {
    const { editParticipant } = this.state;
    if (editParticipant && participant.id === editParticipant.id) {
      return (
        <div className="buttons">
          <button className="button-blue-text button-cancel" onClick={() => this.cancelEdit()}>Cancel</button>
          <button className="button-blue button-save" onClick={() => this.updateParticipant(participant)}>Save</button>
        </div>
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
  // console.log("ParticipantList.mapStateToProps, state", state);
  if (state.participantReducer) {
    return state.participantReducer;
  }
  return {};
};

export default connect(mapStateToProps, { fetchParticipants, deleteParticipant, updateParticipant, participantEmptyErrors })(ParticipantList);