import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.image}
        <br />
        {this.props.firstName}
        <br />
        {this.props.lastName}
        <br />
      </div>
    );
  }
}

export default Profile;
