import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import { callApi } from './api';


import {
  Navbar,
  Register,
  SignIn,
  AllActivities,
  IndividualActivity,
  MyRoutines
} from "./components"
import Routines from './components/Routines';

const App = () => {

  const [signedIn, setSignedIn] = useState(false)


  useEffect(() => {
    localStorage.getItem("token")
      ?
      setSignedIn(true)
      :
      setSignedIn(false)
  }, [])

  const [loadedActivities, setLoadedActivities] = useState([]);
  useEffect(() => {
    callApi({ url: "/activities" }).then(result => {
      setLoadedActivities(result)
    }).catch(error => {
      console.error(error)
    })
  }, []);



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
              <AllActivities loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} />
            </Route>
            <Route path="/routines">
              <Routines />
            </Route>
            <Route path="/activities/:id/routines">
              <IndividualActivity />
            </Route>
            <Route path="/myroutines">
              <MyRoutines signedIn={signedIn} loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} />
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