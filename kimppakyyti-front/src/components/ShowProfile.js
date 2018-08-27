import React, { Component } from "react";
import { isLoggedIn } from "./AuthService";

// const url = "https://melaaman.eu.auth0.com/userinfo";

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

  //   componentDidMount() {
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(data => this.setState({ profileInformation: data }));
  //     console.log("toimii");
  //   }

  render() {
    return (
      <div>
        {isLoggedIn() ? (
          <div>
            <h2>Tiedot</h2>
            {this.state.data}
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
