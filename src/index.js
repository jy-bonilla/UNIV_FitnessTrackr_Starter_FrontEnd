import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'


import {
  AllActivities,
  IndividualActivity,
  SignIn
} from "./components"

const App = () => {

  const [selectedActivity, setSelectedActivity] = useState({})
  return (
    <Router>
      <div className="app">
        <Route path="/activities">
          {selectedActivity.id ? <IndividualActivity /> : <AllActivities />}

        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
      </div>
    </Router>
  );
}


ReactDOM.render(
  <App />,
  document.querySelector("#app")
)

