import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  ReactDOM  from 'react-dom';
import './index.css';

import {
    Navbar,
    Register,
    SignIn,
    SignOut,
    Home,
    Routines,
    MyRoutines
} from "./components"





function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
          <Route exact path="/Home">
          <Home />,
          </Route>
          
          <Route exact path="/Routines">
          <Routines />,
          </Route>

          <Route exact path="/MyRoutines">
          <MyRoutines />,
          </Route>
          
          <Route exact path="/Register">
              <Register />,
            </Route>
            <Route exact path="/SignIn"></Route>
            <SignIn />,
            <Route exact path="/SignOut">
              <SignOut />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App/>,
  document.querySelector("#app")
)