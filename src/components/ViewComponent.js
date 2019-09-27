import React from 'react';

import { connect } from 'react-redux';

import Header from './common/Header';
import ParticipantList from './ParticipantList';
import ParticipantForm from './ParticipantForm';

import "../styles/styles.scss";

/**
 * renders page content
 */
class ViewComponent extends React.Component {

  renderErrors() {
    if (this.props.errors && this.props.errors.length > 0) {
      return (
        <div className="errors">
          {
            this.props.errors.map((error) => {
              return (
                <div key={error.key} className="error">
                  {error.text}
                </div>
              );
            })
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div className="view-container">
        <Header text={"Nord Software"} />
        <div className="page-content">
          <h2 className="title">List of participants</h2>
          {this.renderErrors()}
          <ParticipantForm />
          <ParticipantList />
        </div>
      </div>
    );
  }

}



const mapStateToProps = state => {
  if (state.participantReducer.errors) {
    const { errors } = state.participantReducer;
    errors.map(
      index => ({ ...state.participantReducer[index], index })
    );
    return { errors };
  }

  return {};
};

export default connect(mapStateToProps, {})(ViewComponent);