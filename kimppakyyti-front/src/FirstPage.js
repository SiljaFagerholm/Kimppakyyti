import React, { Component } from "react";
import Time from "./components/Time";
import Date from "./components/Date";
import { Button } from "reactstrap";
import RideBox from "./components/RideBox";
import AllProfiles from "./components/AllProfiles";
import AddNewProfile from "./components/AddProfile";
// import ApiCalendar from "react-google-calendar-api";

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
        <Button outline color="secondary" type="submit">
          Etsin kyytiä
        </Button>{" "}
        <RideBox />
        <AllProfiles />
        <AddNewProfile />
      </div>
    );
  }
}

export default FirstPage;
