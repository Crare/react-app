import React from 'react';

import { connect } from 'react-redux';
import { addNewParticipant } from '../actions';

class ParticipantsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: ''
    }

    this.addNewParticipant = this.addNewParticipant.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addNewParticipant(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.addNewParticipant(this.state);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.addNewParticipant} className="participants-form">
        <div className="form-item flex-width-2">
          <input value={this.state.name} name="name" placeholder="Full name" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-3">
          <input value={this.state.email} name="email" placeholder="E-mail address" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-2">
          <input value={this.state.phone} name="phone" placeholder="Phone number" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-1">
        </div>
        <div className="form-item flex-width-1 no-padding">
          <button onClick={this.addNewParticipant}>Add new</button>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => {
  console.log("mapStateToProps, state:", state);
  if (state.participantReducer.form) {
    return state.participantReducer.form;
  }
  //   const { participants } = state.participantReducer;
  //   participants.map(
  //     index => ({ ...state.participantReducer[index], index })
  //   );
  //   return { participants };
  // }
  return {};
};

export default connect(mapStateToProps, { addNewParticipant })(ParticipantsForm);