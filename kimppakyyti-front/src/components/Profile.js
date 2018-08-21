import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.Image}
        <br />
        {this.props.Nickname}
        <br />
        {this.props.FirstName}
        <br />
        {this.props.LastName}
        <br />
        {this.props.Email}
        <br />
        {this.props.Phonenumber}
        <br />
        {this.props.Address}
        <br />
        {this.props.City}
        <br />
      </div>
    );
  }
}

export default Profile;
