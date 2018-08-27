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
    //this.setState({ profile: getProfile() });
    getProfile((err, profile) => {
      console.log(profile);
      this.setState({ profile: profile });
    });
  }

  render() {
    //const pro = getProfile();
    console.dir(this.state.profile);
    //console.dir(pro);
    //const { profile } = this.state;
    return (
      isLoggedIn() && (
        <div>
          {/* <h1>{pro.name}</h1>
          <img src={pro.picture} alt="profile" />
          <h3>{pro.nickname}</h3> */}
          {/*JSON.stringify(profile, null, 2)*/}
        </div>
      )
    );
  }
}

export default ProfileAuth;
