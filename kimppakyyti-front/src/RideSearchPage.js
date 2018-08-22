import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
  } from "react-router-dom";
  import FirstPage from "./FirstPage";
import RideBox from "./components/RideBox";
import AddNewRide from "./components/AddRide";

  class RideSearchPage extends Component {
      render() {
          return (
              <div>
                  <AddNewRide/>
                  <RideBox/>
              </div>
          )
      }
  }

  export default RideSearchPage;