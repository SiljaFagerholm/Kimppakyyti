import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { login, logout, isLoggedIn } from "./components/AuthService";
import "./App.css";
import logo from "./Logo_kimppalada_2.png";

class NavComponent extends Component {
  render() {
    return (
      <div>
        <Navbar className="NavBar">
          <NavbarBrand href="/">
            <img width={200} height={100} src={logo} alt={"logo"} />
          </NavbarBrand>
          <Nav>
            <NavItem>
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
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavComponent;
