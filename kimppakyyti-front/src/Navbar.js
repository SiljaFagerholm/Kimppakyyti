import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import { login, logout, isLoggedIn } from "./components/AuthService";
import "./App.css";
import logo from "./Logo_kimppalada_2.png";

class NavComponent extends Component {
  render() {
    return (
      <div>
        <Navbar className="Navbar">
          <NavbarBrand href="/">
            <img width={200} height={100} src={logo} alt={"logo"} />
          </NavbarBrand>
          <Nav>
            <NavItem>
              {isLoggedIn() ? (
                <button size="sm" className="Button" onClick={() => logout()}>
                  Log out{" "}
                </button>
              ) : (
                <button size="sm" className="Button" onClick={() => login()}>
                  Log In
                </button>
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
