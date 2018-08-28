import React, { Component } from "react";
// import RideList from "./RideList";
import { getEveryRide } from "./RideService";

// const urlGetRides =
//   "https://kimppakyytiapi.azurewebsites.net/api/ride/getallrides";

class RideBox extends Component {
  constructor() {
    super();
    this.state = { list: {} };
  }

  componentDidMount() {
    getEveryRide();
  }

  // componentDidMount() {
  //   this.GetEveryRide();
  // }

  // GetEveryRide = () => {
  //   fetch(urlGetRides)
  //     .then(result => result.json())
  //     .then(data => {
  //       this.setState({ list: data });
  //     });
  // };

  render() {
    return (
      <div>
        {this.state.list.nickname}
        {/* <RideList rides={this.state.list} /> */}
      </div>
    );
  }
}

export default RideBox;
