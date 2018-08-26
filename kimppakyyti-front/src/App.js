import React, { Component } from "react";
import "./App.css";
import FirstPage from "./FirstPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { browserHistory } from "react-router";
import RideSearchPage from "./RideSearchPage";
import AddRide from "./components/AddRide";
import { Container, Row } from "reactstrap";
import { requireAuth } from "./components/AuthService";
import AllProfiles from "./components/AllProfiles";
import Callback from "./Callback";
import NavComponent from "./Navbar";

class App extends Component {
  force() {
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        <NavComponent />
        <Container className="Container">
          <Row>
            <Router history={browserHistory}>
              <Switch>
                <Route exact path="/firstpage" component={FirstPage} />
                <Route
                  exact
                  path="/AllProfiles"
                  component={AllProfiles}
                  onEnter={requireAuth}
                />
                <Route
                  exact
                  path="/ridesearchpage"
                  component={RideSearchPage}
                />
                <Route exact path="/addride" component={AddRide} />
                <Route path="/callback" component={Callback} />
                <Redirect exact from="/" to="/firstpage" />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Router>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
