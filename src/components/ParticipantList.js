import React from 'react';

export default class ParticipantList extends React.Component {

  renderHeader() {
    return (
      <div className="list-header">
        <div className="list-header-item-1">
          Name
        </div>
        <div className="list-header-item-2">
          E-mail address
        </div>
        <div className="list-header-item-3">
          Phone number
        </div>
        <div className="list-header-item-4">

        </div>
        <div className="list-header-item-5">

        </div>
      </div>
    );
  }

  renderItems() {
    return (
      <div className="list-items">
        {
          this.props.participants.map((p) => {
            return (
              <div className="list-item">
                <div className="list-item-property-1">{p.name}</div>
                <div className="list-item-property-2">{p.email}</div>
                <div className="list-item-property-3">{p.phone}</div>
                <div className="list-item-property-4">edit</div>
                <div className="list-item-property-5">delete</div>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="list">
        {this.renderHeader()}
        {this.renderItems()}
      </div>
    );
  }
}