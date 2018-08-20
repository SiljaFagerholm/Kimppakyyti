import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Kirjaudu</h2>
        <label>Käyttäjätunnus: </label>
        <input ref="name" type="text" required />
        <label>Salasana: </label>
        <input ref="password" type="password" required />
        <button onClick={this.xxx} type="button">
          Kirjaudu
        </button>
      </div>
    );
  }
}

export default Login;
