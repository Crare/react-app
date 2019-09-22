import React from 'react';

import ParticipantList from './ParticipantList';
import ParticipantService from '../services/ParticipantService';

export default class ParticipantsView extends React.Component {

  constructor(props) {
    super(props);
    this.p_service = new ParticipantService();
  }

  componentDidMount() {
    this.p_service.generateParticipants(20, (participants) => {
      this.setState({ participants });
    });
  }

  render() {
    if (this.state && this.state.participants) {
      return (
        <div className="participants-view">
          <ParticipantList participants={this.state.participants} />
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
