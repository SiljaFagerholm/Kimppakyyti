import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  Button
} from "reactstrap";
import { login, logout, isLoggedIn } from "./components/AuthService";
import "./App.css";

class NavComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar light className="NavBar">
          <NavbarBrand href="/">
            <span className="Logo">K</span> imppalada
          </NavbarBrand>
          <Nav>
            <NavItem>
              <Button outline color="secondary" href="/AllProfiles">
                Kaikki kyydit
              </Button>
              &nbsp;
              {isLoggedIn() ? (
                <Button outline color="secondary" onClick={() => logout()}>
                  Log out{" "}
                </Button>
              ) : (
                <Button outline color="secondary" onClick={() => login()}>
                  Log In
                </Button>
              )}
            </NavItem>
            <UncontrolledDropdown nav inNavbar />
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavComponent;
