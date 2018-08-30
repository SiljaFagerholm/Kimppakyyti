import React, { Component } from "react";

const url = "https://kimppakyytiapi.azurewebsites.net/api/user/post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.addUser();
  }

  addUser = e => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("addUser", res);
        return res;
      })
      .catch(err => console.error("addUser error", err));
  };

  render() {
    return (
      <div>
        {/* {this.props.Image}
        <br /> */}
        {this.props.nickname}
        <br />
        {this.props.firstName}
        <br />
        {this.props.lastName}
        <br />
        {this.props.email}
        <br />
        {this.props.phonenumber}
        <br />
        {this.props.address}
        <br />
        {this.props.city}
        <br />
      </div>
    );
  }
}

export default Profile;
