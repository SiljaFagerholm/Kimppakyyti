import React, { Component } from "react";
import { isLoggedIn, getProfile } from "./AuthService";

var data = [
  {
    family_name: "",
    gender: "",
    given_name: "",
    locale: "",
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: ""
  }
];

class ShowProfile extends Component {
  state = { profileInformation: data };
  constructor(props) {
    super(props);
    this.state = { profileInformation: [], msg: "" };
    console.log(data);
  }

  render() {
    return (
      <div>
        {isLoggedIn() ? (
          <div>
            <h2>Tiedot</h2>
            {this.state.profileInformation}
          </div>
        ) : (
          <div>
            <h2>Kirjaudu sisään</h2>
          </div>
        )}
      </div>
    );
  }
}

export default ShowProfile;
