import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';


import {
  Navbar,
  Register,
  SignIn,
  SignOut
} from "./components"

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/my-app/src/components/Register.js">
              <Register />
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