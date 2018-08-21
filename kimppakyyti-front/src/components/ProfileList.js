import React, { Component } from "react";
import Profile from "./Profile";

class ProfileList extends Component {
  render() {
    var profileList = this.props.data.map(function(p) {
      return (
        <Profile
          key={p.Id}
          Image={p.Image}
          Nickname={p.Nickname}
          FirstName={p.FirstName}
          LastName={p.LastName}
          Email={p.Email}
          Phonenumber={p.Phonenumber}
          Address={p.Address}
          City={p.City}
        />
      );
    });
    return <div> {profileList}</div>;
  }
}
export default ProfileList;
