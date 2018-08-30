import React, { Component } from "react";
import { deleteRideFromApi } from "./RideService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

class NicknameRide extends Component {
  delteRideFromList = () => {
    deleteRideFromApi(this.props.singleride.id, () => {
      this.props.deleteRideFromList(this.props.singleride.id);
    });
  };
  render() {
    return (
      <div>
        <br />
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
            Aikaväli: {this.props.singleride.startTime} -{" "}
            {this.props.singleride.endTime}
          </ListGroupItem>
          <ListGroupItem>
            Paikkoja jäljellä: {this.props.singleride.seatsLeft}
          </ListGroupItem>
        </ListGroup>
        <br />
        <Button>Muuta</Button>
        &nbsp;
        <Button type="button" onClick={this.delteRideFromList}>
          Poista
        </Button>
        <br />
      </div>
    );
  }
}

export default NicknameRide;
