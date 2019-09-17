import React from 'react';

import Header from "./components/common/header/Header";
import { ParticipantsViewComponent } from './components/ParticipantsViewComponent';

function App() {

  return (
    <div className="App box">
      <Header title="Lord Software"></Header>
      <div className="page-content">
        <ParticipantsViewComponent></ParticipantsViewComponent>
      </div>
    </div>
  );
}

export default App;
