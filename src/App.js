import React from 'react';

import ViewComponent from "./components/ViewComponent";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import "./styles/styles.scss";

function App() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider className="App" store={store}>
      <ViewComponent></ViewComponent>
    </Provider>
  );
}

export default App;
