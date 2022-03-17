import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/Register">
              <Register />,
            </Route>
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

export default App;
