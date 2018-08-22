import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
