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
import logo from "./Logo_kimppalada.png";

class NavComponent extends Component {
  render() {
    return (
      <div>
        <Navbar light className="NavBar">
          <NavbarBrand href="/">
            <img width={200} height={100} src={logo} alt={"logo"} />
          </NavbarBrand>
          <Nav>
            <NavItem>
              &nbsp;
              {isLoggedIn() ? (
                <Button size="sm" outline color="info" onClick={() => logout()}>
                  Log out{" "}
                </Button>
              ) : (
                <Button size="sm" outline color="info" onClick={() => login()}>
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
