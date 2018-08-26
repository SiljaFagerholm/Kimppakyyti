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
            <img width={84} height={84} src={logo} alt={"logo"} />
            <span className="Logo">I M P P A L A D A</span>
          </NavbarBrand>
          <Nav>
            <NavItem>
              &nbsp;
              {isLoggedIn() ? (
                <Button
                  size="sm"
                  outline
                  color="secondary"
                  onClick={() => logout()}
                >
                  Log out{" "}
                </Button>
              ) : (
                <Button
                  size="sm"
                  outline
                  color="secondary"
                  onClick={() => login()}
                >
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
