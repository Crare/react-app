import React from 'react';

import { connect } from 'react-redux';
import { addNewParticipant } from '../actions';

class ParticipantForm extends React.Component {

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

  componentDidUpdate(stuff) {
    // console.log("ParticipantForm componentDidUpdate, stuff:", stuff);
  }

  addNewParticipant(event) {
    event.preventDefault();
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
    const { name, email, phone } = this.state;

    return (
      <form onSubmit={this.addNewParticipant} className="participants-form">
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
          <button onClick={this.addNewParticipant}>Add new</button>
        </div>
      </form>
    );
  }
}


// const mapStateToProps = state => {
//   console.log("FORM mapStateToProps, state:", state);
//   if (state.participantReducer.form) {
//     const { name, email, phone } = state.participantReducer.form;
//   }
//   return {};
// };

export default connect(null, { addNewParticipant })(ParticipantForm);