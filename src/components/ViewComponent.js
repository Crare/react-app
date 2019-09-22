import React from 'react';

import Header from './common/Header';
// import ParticipantTableViewComponent from './ParticipantTableViewComponent';
import ParticipantsView from './ParticipantsView';
import ParticipantsForm from './ParticipantsForm';

import "../styles/styles.scss";

/**
 * renders page content
 */
export default class ViewComponent extends React.Component {

  render() {
    return (
      <div className="view-container">
        <Header text={"Nord Software"} />
        <div className="page-content">
          <h2 className="title">List of participants</h2>
          { /* <ParticipantTableViewComponent /> */}
          <ParticipantsForm />
          <ParticipantsView />
        </div>
      </div>
    );
  }

}