import React, { Component } from "react";

import RideBox from "./components/RideBox";
import AddNewRide from "./components/AddRide";

class RideSearchPage extends Component {
  render() {
    return (
      <div>
        <AddNewRide />
        <RideBox />
      </div>
    );
  }
}

export default RideSearchPage;
