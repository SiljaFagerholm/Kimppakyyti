import React, { Component } from "react";
import ProfileList from "./ProfileList";
import { isLoggedIn } from "./AuthService";

const url = "https://kimppakyytiapi.azurewebsites.net/api/user/GetAllUsers";

var data = [
  {
    // Id: 1,
    // Image: "",
    nickname: "",
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    address: "",
    city: ""
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
        {isLoggedIn() ? (
          <div>
            <h2>Profiilit</h2>
            <ProfileList data={this.state.profileList} />
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

export default AllProfiles;
