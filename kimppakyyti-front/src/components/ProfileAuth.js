import React, { Component } from "react";
import { profile, getProfile, userProfile } from "./AuthService";

class ProfileAuth extends Component {
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <img src={profile.picture} alt="profile" />
          <div>
            <h3>{profile.nickname}</h3>
          </div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default ProfileAuth;
