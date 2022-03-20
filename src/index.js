import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './index.css';


import {
  Navbar,
  Register,
  SignIn,
  SignOut,
  AllActivities,
  CreateActivity
} from "./components"

const App = () => {

  // const [selectedActivity, setSelectedActivity] = useState({})
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route path="/my-app/src/components/Register.js">
              <Register />
            </Route>
            <Route exact path="/my-app/src/components/AllActivities.js">
              <AllActivities />
            </Route>
            <Route exact path="/my-app/src/components/CreateActivity.js">
              <CreateActivity />
            </Route>
            <Route exact path="/my-app/src/components/SignIn.js">
              <SignIn />
            </Route>
            <Route exact path="/my-app/src/components/SignOut.js">
              <SignOut />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


ReactDOM.render(
  <App />,
  document.querySelector("#app")
)