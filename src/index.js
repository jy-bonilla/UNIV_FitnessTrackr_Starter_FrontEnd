import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';


import {
  Navbar,
  Register,
  SignIn,
  SignOut,
  AllActivities,
  CreateActivity,
  IndividualActivity
} from "./components"

const App = () => {
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    localStorage.getItem("token")
      ?
      setSignedIn(true)
      :
      setSignedIn(false)
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
        <div className="Content">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/activities">
              <AllActivities />
            </Route>
            <Route path="/activities/:id/routines">
              <IndividualActivity />
            </Route>
            <Route path="/">
              <SignIn setSignedIn={setSignedIn} />
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