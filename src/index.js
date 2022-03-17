import React from 'react';
import ReactDOM from 'react-dom';

import {
  CreateActivities
} from "./components"

const App = () => {
  return (
    <div className="App">

      <CreateActivities />
    </div>
  );
}


ReactDOM.render(
  <App />,
  document.querySelector("#app")
)

