import React, { Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
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
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`/firstpage`} />;
    } else {
      return (
        <div>
          <AddNewRide />
          <RideBox />
          <button onClick={this.goBack}>Back</button>
        </div>
      );
    }
  }
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
