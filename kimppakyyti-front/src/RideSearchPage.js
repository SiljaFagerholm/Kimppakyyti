import React, { Component } from "react";
//import { BrowserRouter as Router, Redirect } from "react-router-dom";
import RideBox from "./components/RideBox";
import AddNewRide from "./components/AddRide";

class RideSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  goBack = () => {
    this.props.history.push("/firstpage");
  };

  render() {
    return (
      <div>
        <AddNewRide />
        <RideBox />
        <button onClick={this.goBack}>Back</button>
      </div>
    );
  }
}

export default RideSearchPage;
