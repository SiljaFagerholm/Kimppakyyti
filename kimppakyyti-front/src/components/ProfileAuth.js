import React, { Component } from "react";
import { isLoggedIn, getProfile } from "./AuthService";

class ProfileAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    getProfile((err, profile) => {
      console.log(profile);
      this.setState({ profile: profile });
    });
  }

  render() {
    console.dir(this.state.profile);

    return (
      isLoggedIn() && (
        <div>
          <h1>{this.state.profile.name}</h1>
          <img src={this.state.profile.picture} alt="profile" />
          <h3>{this.state.profile.nickname}</h3>
        </div>
      )
    );
  }
}

export default ProfileAuth;
