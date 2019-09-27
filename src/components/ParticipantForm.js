import React from 'react';

import { connect } from 'react-redux';
import { addNewParticipant, participantFormUpdate } from '../actions';

class ParticipantForm extends React.Component {

  constructor(props) {
    super(props);

    this.addParticipant = this.addParticipant.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addParticipant(event) {
    event.preventDefault();
    const { name, email, phone } = this.props.form;
    this.props.addNewParticipant({ name, email, phone });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const prop = event.target.name;
    this.props.participantFormUpdate({ prop, value })
  }

  render() {
    const { name, email, phone } = this.props.form;

    return (
      <form onSubmit={this.addParticipant} className="participants-form">
        <div className="form-item flex-width-2">
          <input value={name} name="name" placeholder="Full name" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-3">
          <input value={email} name="email" placeholder="E-mail address" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-2">
          <input value={phone} name="phone" placeholder="Phone number" onChange={this.handleInputChange} />
        </div>
        <div className="form-item flex-width-1">
        </div>
        <div className="form-item flex-width-1 no-padding">
          <button onClick={this.addParticipant}>Add new</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  if (state.participantReducer.form) {
    return { form: state.participantReducer.form };
  }
  return {};
};

export default connect(mapStateToProps, { addNewParticipant, participantFormUpdate })(ParticipantForm);