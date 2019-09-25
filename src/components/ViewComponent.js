import React from 'react';

import { connect } from 'react-redux';

import Header from './common/Header';
import ParticipantsView from './ParticipantsView';
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
                <div className="error">
                  {error.text}
                </div>
              );
            })
          }
        </div>
      )
    }
  }

  renderContent() {
    if (this.props.loading) {
      return (
        <div className="page-content">
          <span>Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="page-content">
          <h2 className="title">List of participants</h2>
          {this.renderErrors()}
          <ParticipantForm />
          <ParticipantsView />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="view-container">
        <Header text={"Nord Software"} />
        {this.renderContent()}
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

  if (state.participantReducer.loading) {
    return { loading: state.loading };
  }

  return {};
};

export default connect(mapStateToProps, {})(ViewComponent);