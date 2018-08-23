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
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import { login, logout, isLoggedIn, requireAuth } from "./AuthService";
import AllProfiles from "./components/AllProfiles";
import Callback from "./Callback";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Kimppalada</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/AllProfiles">Kaikki kyydit</NavLink>
              </NavItem>
              <NavItem>
                {isLoggedIn() ? (
                  <NavLink onClick={() => logout()}>Log out </NavLink>
                ) : (
                  <NavLink onClick={() => login()}>Log In</NavLink>
                )}
              </NavItem>
              <UncontrolledDropdown nav inNavbar />
            </Nav>
          </Navbar>
        </div>

        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/firstpage" component={FirstPage} />
            <Route
              exact
              path="/special"
              component={AllProfiles}
              onEnter={requireAuth}
            />
            <Route exact path="/ridesearchpage" component={RideSearchPage} />
            <Route exact path="/addride" component={AddRide} />
            <Route path="/callback" component={Callback} />
            <Redirect exact from="/" to="/firstpage" />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
