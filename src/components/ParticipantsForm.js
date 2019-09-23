import React from 'react'

export default class ParticipantsForm extends React.Component {

  render() {
    return (
      <div className="participants-form">
        <div className="form-item flex-width-2">
          <input name="name" placeholder="Full name" />
        </div>
        <div className="form-item flex-width-3">
          <input name="email" placeholder="E-mail address" />
        </div>
        <div className="form-item flex-width-2">
          <input name="phone" placeholder="Phone number" />
        </div>
        <div className="form-item flex-width-1">
        </div>
        <div className="form-item flex-width-1 no-padding">
          <button>Add new</button>
        </div>
      </div>
    );
  }
}