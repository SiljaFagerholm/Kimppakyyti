import React, { Component } from "react";
// import ApiCalendar from "react-google-calendar-api";

const url = "";

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
        <p>Google-kalenteri</p>
        <br />
        <input value="Tarjoan kyytiä" type="submit" />
        <input value="Etsin kyytiä" type="submit" />
      </div>
    );
  }
}

export default FirstPage;
