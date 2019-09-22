import React from 'react'

export default class ParticipantsForm extends React.Component {

  render() {
    return (
      <div className="participants-form">
        <div className="participants-form-property-1">
          <input name="name" placeholder="Full name" />
        </div>
        <div className="participants-form-property-2">
          <input name="email" placeholder="E-Mail address" />
        </div>
        <div className="participants-form-property-3">
          <input name="phone" placeholder="Phone number" />
        </div>
        <div className="participants-form-property-4">
        </div>
        <div className="participants-form-property-5">
          <button>Add new</button>
        </div>
      </div>
    );
  }
}