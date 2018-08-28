import React, { Component } from "react";
import Ride from "./Ride";

class RideList extends Component {
  render() {
<<<<<<< HEAD
    var everything = this.props.rides.map(function(ride, i) {
      return <Ride singleride={ride} key={i} />;
=======
    var everything = this.props.rides.map(function(ride) {
      return <Ride singleride={ride} key={ride.id} />;
>>>>>>> master
    });
    return (
      <div>
        <ul>{everything}</ul>
      </div>
    );
  }
}

export default RideList;
