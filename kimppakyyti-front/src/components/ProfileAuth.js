import React, { Component } from "react";

class ProfileAuth extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div>
        <div>
          <h1>{profile.name}</h1>
          <h3>{profile.nickname}</h3>
        </div>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  }
}

export default ProfileAuth;
