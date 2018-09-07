import React, { Component } from "react";
import "./App.css";
import FirstPage from "./FirstPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import RideSearchPage from "./RideSearchPage";
import AddRide from "./components/AddRide";
import { Container, Row } from "reactstrap";
import { requireAuth } from "./components/AuthService";
import AllProfiles from "./components/AllProfiles";
import Callback from "./Callback";
import NavComponent from "./Navbar";
import ProfileAuth from "./components/ProfileAuth";
import RideBox from "./components/RideBox";
import OfferCreated from "./components/OfferCreated";
import LookingForLocation from "./components/LookingForLocation";
import ChangeRide from "./components/ChangeRide";

class App extends Component {
  force() {
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        <NavComponent />
        <Container className="Container">
          <Row className="Row">
            <Router>
              <Switch>
                <Route exact path="/firstpage" component={FirstPage} />
                <Route exact path="/offercreated" component={OfferCreated} />
                <Route exact path="/ridebox" component={RideBox} />
                <Route
                  exact
                  path="/AllProfiles"
                  component={AllProfiles}
                  onEnter={requireAuth}
                />
                <Route
                  exact
                  path="/profileauth"
                  component={ProfileAuth}
                  onEnter={requireAuth}
                />
                <Route
                  exact
                  path="/ridesearchpage"
                  component={RideSearchPage}
                />
                <Route exact path="/addride" component={AddRide} />
                <Route exact path="/changeride" component={ChangeRide} />
                <Route path="/callback" component={Callback} />
                <Route path="/location" component={LookingForLocation} />
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
