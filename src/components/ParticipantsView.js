import React from 'react';

import { connect } from 'react-redux';
import { fetchParticipants } from '../actions';

import ParticipantList from './ParticipantList';
// import ParticipantService from '../services/ParticipantService';


class ParticipantsView extends React.Component {

  componentDidMount() {
    this.props.fetchParticipants();
  }

  renderList() {
    if (this.props.participants) {
      return (
        <ParticipantList participants={this.props.participants} />
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
  console.log("ParticipantsView mapStateToProps, state:", state);
  if (state.participantReducer.participants) {
    const { participants } = state.participantReducer;
    console.log(participants);
    return { participants };
  }
  return {};
};

export default connect(mapStateToProps, { fetchParticipants })(ParticipantsView);