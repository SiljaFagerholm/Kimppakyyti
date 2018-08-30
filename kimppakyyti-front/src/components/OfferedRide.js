import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class OfferedRide extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Nickname: {this.props.singleride.nickname}</p>
        <p>Mistä: {this.props.singleride.startAddress}</p>
        <p>Mihin: {this.props.singleride.targetAddress}</p>
        <p>
          Aikaväli: {this.props.singleride.startTime} -{" "}
          {this.props.singleride.endTime}
        </p>
        <p>Milloin: {this.props.singleride.when}</p>
        <p>Hinta: {this.props.singleride.price}</p>
      </div>
    );
  }
}

export default OfferedRide;
