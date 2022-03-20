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
  CreateActivity
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
  // const [selectedActivity, setSelectedActivity] = useState( {})
  return (
    <Router>
      <div className="App">
        <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
        <div className="Content">
          <Switch>
            <Route path="/my-app/src/components/Register.js">
              <Register />
            </Route>
            <Route path="/activities">
              <AllActivities />
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