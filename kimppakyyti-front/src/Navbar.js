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
            <img className="logo" width={200} height={100} src={logo} alt={"logo"} />
          </NavbarBrand>
          <Nav>
          <NavItem>
              {isLoggedIn() ? (
                <Button 
                  size="md"
                  outline color="secondary"
                  href="/profileauth"
                >
                  Profiili
                </Button>
              ) : (
                <span></span>
              )}
            </NavItem>
            &nbsp;
            <NavItem>
              {isLoggedIn() ? (
                <Button
                  style={{ marginRight: '10px' }}
                  size="md"
                  outline
                  color="secondary"
                  onClick={() => logout()}
                >
                  Log out{" "}
                </Button>
              ) : (
                <Button
                  style={{ marginRight: '10px' }}
                  size="md"
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
