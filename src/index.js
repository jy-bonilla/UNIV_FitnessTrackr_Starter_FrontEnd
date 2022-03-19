import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import {
  AllActivities
} from "./components"

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/activities">
          <AllActivities />
        </Route>
        
      </div>
    </Router>
  );
}


ReactDOM.render(
  <App />,
  document.querySelector("#app")
)

