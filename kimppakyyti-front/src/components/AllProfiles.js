import React, { Component } from "react";
import ProfileList from "./ProfileList";

const url = "/api/user";

var data = [
  {
    Id: 1,
    Image: "",
    Nickname: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Phonenumber: "",
    Address: "",
    City: ""
  }
];

class AllProfiles extends Component {
  state = { profileList: data };
  constructor(props) {
    super(props);
    this.state = { profileList: [], msg: "" };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ profileList: data }));
    console.log("toimii");
  }

  render() {
    return (
      <div>
        <ProfileList data={this.state.profileList} />
      </div>
    );
  }
}

export default AllProfiles;
