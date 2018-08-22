import React, { Component } from "react";
import Profile from "./Profile";

class ProfileList extends Component {
  render() {
    var profileList = this.props.data.map(function(p) {
      return (
        <Profile
          key={p.nickname}
          // Image={p.Image}
          nickname={p.nickname}
          firstName={p.firstName}
          lastName={p.lastName}
          email={p.email}
          phonenumber={p.phonenumber}
          address={p.address}
          city={p.city}
        />
      );
    });
    return <div> {profileList}</div>;
  }
}
export default ProfileList;
