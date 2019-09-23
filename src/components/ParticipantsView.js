import React from 'react';

import { connect } from 'react-redux';
import { generateParticipants } from '../actions';

import ParticipantList from './ParticipantList';
// import ParticipantService from '../services/ParticipantService';


class ParticipantsView extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.p_service = new ParticipantService();
  // }

  componentDidMount() {
    // this.p_service.generateParticipants(20, (participants) => {
    //   this.setState({ participants });
    // });
    this.props.generateParticipants(20);
  }

  render() {
    if (this.props.participants) {
      return (
        <div className="participants-view">
          <ParticipantList participants={this.props.participants} />
        </div>
      );
    } else {
      return (
        <div className="participants-view">
          Loading participants...
        </div>
      );
    }
  }
}


const mapStateToProps = state => {
  // console.log("mapStateToProps, state:", state);
  if (state.participantReducer.participants) {
    const { participants } = state.participantReducer;
    participants.map(
      index => ({ ...state.participantReducer[index], index })
    );
    return { participants };
  }
  return {};
};

export default connect(mapStateToProps, { generateParticipants })(ParticipantsView);