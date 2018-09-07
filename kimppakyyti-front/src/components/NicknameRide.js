import React, { Component } from "react";
import { deleteRideFromApi, hopOff } from "./RideService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import ChangeRide from './ChangeRide';

class NicknameRide extends Component {


  deleteRideFromList = () => {
    deleteRideFromApi(this.props.singleride.id, () => {
      this.props.deleteRideFromList(this.props.singleride.id);
    });
  };

  hopOffBoard = () => {
    hopOff(this.props.singleride.id, this.props.singleride.seatsLeft, this.props.profile.nickname, () => {
      this.props.deleteFromOnBoard(this.props.singleride.id)
    });
  }

  showMessages = e => {
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
    var userIsOnboard = this.props.singleride.onBoard.indexOf(this.props.profile.nickname) > -1;
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
        <Button className="btn-secondary m-2" type="button" onClick={this.showMessages}>
          Kyydin viestit
        </Button>
        <Button
          id={this.props.singleride.id} startAddress={this.props.singleride.startAddress} targetAddress={this.props.singleride.targetAddress}
          price= {this.props.singleride.price} seatsLeft={this.props.singleride.seatsLeft} startTime={this.props.singleride.startTime}
          endTime={this.props.singleride.endTime}

          className="btn-secondary"
          type="button"
          onClick={ChangeRide}
          href="/changeride"
          visibility={userIsDriver}
        >
          Muuta
        </Button>
        &nbsp;
        {userIsDriver && <Button className="btn-danger" type="button" onClick={this.deleteRideFromList}>
          Poista
        </Button>}
        {userIsOnboard && <Button className="btn-warning" type="button" onClick={this.hopOffBoard} >
          Poistu kyydistä
        </Button>}
        <br />
      </div>
    );
  }
}

export default NicknameRide;
