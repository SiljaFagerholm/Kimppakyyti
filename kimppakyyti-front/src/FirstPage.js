import React, { Component } from "react";
import Time from "./components/Time";
import Date from "./components/Date";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { getProfile } from "./components/AuthService";
import "./App.css";

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  movetoRideSearch = () => {
    this.setState({
      redirect: true
    });
    return;
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`/ridesearchpage`} />;
    } else {
      return (
        <div>
          <label>Mistä: </label>
          <input
            maxLength="50"
            onClick={this.xxx}
            ref="from"
            type="text"
            required
          />{" "}
          <br />
          <label>Minne: </label>
          <input
            maxLength="50"
            onClick={this.xxx}
            ref="where"
            type="text"
            required
          />
          <br />
          <Date />
          <Time />
          <br />
          <Button outline color="secondary" type="submit">
            Tarjoan kyytiä
          </Button>{" "}
          <Button
            outline
            color="secondary"
            onClick={this.movetoRideSearch}
            type="button"
          >
            Etsin kyytiä
          </Button>
          <Button
            outline
            color="secondary"
            onClick={() => getProfile()}
            type="button"
          >
            Profiili{" "}
          </Button>
          <Button outline color="secondary" href="/AllProfiles">
            Kaikki kyydit
          </Button>
        </div>
      );
    }
  }
}

export default FirstPage;
