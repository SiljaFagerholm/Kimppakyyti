import React, { Component } from "react";
import { deleteRideFromApi } from "./RideService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import ChangeRide from './ChangeRide';

class NicknameRide extends Component {


  deleteRideFromList = () => {
    deleteRideFromApi(this.props.singleride.id, () => {
      this.props.deleteRideFromList(this.props.singleride.id);
    });
  };

  hopOffBoard = () => {
    console.log("Removing user from onboard!");
  }

  showMessages = e => {
    console.log("Viestit kyytiin " + this.props.singleride.id + " liittyen!");
    localStorage.setItem("ride", this.props.singleride.id);
    this.props.history.push("/messages");
  }
  render() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let start = new Date(this.props.singleride.startTime);
    start = start.toLocaleString("fi-FI", options);

    let end = new Date(this.props.singleride.endTime);
    end = end.toLocaleString("fi-FI", options);
    var userIsDriver = this.props.singleride.nickname === this.props.profile.nickname;
    console.log("Riden " + this.props.singleride.id + " userisdriver: " + userIsDriver)
    let onBoard = this.props.singleride.onBoard.map(function (ride, i) {
      return <p>{ride}</p>

    });
    return (
      <div>
        <br />
        <ListGroup>

          <ListGroupItem>
            Mistä: {this.props.singleride.startAddress}
          </ListGroupItem>
          <ListGroupItem>
            Mihin: {this.props.singleride.targetAddress}
          </ListGroupItem>
          <ListGroupItem>
            Aikaväli: {start} -{" "}
            {end}
          </ListGroupItem>
          <ListGroupItem>
            Paikkoja jäljellä: {this.props.singleride.seatsLeft}
          </ListGroupItem>
          <ListGroupItem>
            Kyydissä: {onBoard}
          </ListGroupItem>
        </ListGroup>
        <br />
        <Button id={this.props.singleride.id} startAddress={this.props.singleride.startAddress} targetAddress={this.props.singleride.targetAddress}
                price= {this.props.singleride.price} seatsLeft={this.props.singleride.seatsLeft} startTime={this.props.singleride.startTime}
                endTime={this.props.singleride.endTime}
          type="button"
          onClick={ChangeRide}
          href="/changeride"
          visibility={userIsDriver}
        >
          Muuta
        </Button>
        &nbsp;
        <Button type="button" onClick={this.deleteRideFromList} visibility={userIsDriver}>
          Poista
        </Button>
        <Button type="button" onClick={this.hopOffBoard} visibility={!userIsDriver}>
          Poistu kyydistä
        </Button>
        <br />
        <Button type="button" onClick={this.showMessages}>
          Näytä kyytiin liittyvät viestit
        </Button>
      </div>
    );
  }
}

export default NicknameRide;
