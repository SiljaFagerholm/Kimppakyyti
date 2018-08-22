import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import "./components/Login";
import FirstPage from "./FirstPage";
// import "./components/AddProfile";

import AllProfiles from "./components/AllProfiles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import RideSearchPage from "./RideSearchPage";
import AddRide from "./components/AddRide";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Router>
          <Switch>
            <Route exact path="/firstpage" component={FirstPage} />
            <Route exact path="/ridesearchpage" component={RideSearchPage} />
            <Route exact path="/addride" component={AddRide} />
            <Redirect exact from="/" to="/firstpage" />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
