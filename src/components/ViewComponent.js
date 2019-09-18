import React from 'react';

import Header from './common/Header';
import ParticipantTableViewComponent from './ParticipantTableViewComponent';

import "../styles/styles.scss";

export default class ViewComponent extends React.Component {

  render() {
    return (
      <div className="view-container">
        <Header text={"Nord Software"}/>
        <div className="page-content">
          <ParticipantTableViewComponent />
        </div>
      </div>
    );
  }

}