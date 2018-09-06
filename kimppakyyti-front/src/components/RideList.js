import React, { Component } from "react";
import Ride from "./Ride";

class RideList extends Component {
  render() {
    var everything = this.props.rides.map(function (ride, i) {
      return <Ride singleride={ride} key={i} />;
    });
    return (
      <div>
        <ul>{everything}</ul>
      </div>
    );
  }
}

export default RideList;
