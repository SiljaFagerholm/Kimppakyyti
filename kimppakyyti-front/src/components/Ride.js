import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

class Ride extends Component {
  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            Nickname: {this.props.singleride.nickname}
          </ListGroupItem>
          <ListGroupItem>
            Mistä: {this.props.singleride.startAddress}
          </ListGroupItem>
          <ListGroupItem>
            Mihin: {this.props.singleride.targetAddress}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            Aikaväli: {this.props.singleride.startTime} -{" "}
            {this.props.singleride.endTime}
          </ListGroupItem>
          <ListGroupItem>Milloin: {this.props.singleride.when}</ListGroupItem>
          <ListGroupItem>Hinta: {this.props.singleride.price}</ListGroupItem>
        </ListGroup>
        <Button>Liity kyytiin</Button>
      </div>
    );
  }
}

export default Ride;
