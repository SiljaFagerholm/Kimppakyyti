import React, { Component } from "react";
import { deleteRideFromApi, hopOff } from "./RideService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

class NicknameRide extends Component {


  changeRide = () => {
    console.log("Nyt voin muuttaa kyydin asetuksia!")
  }

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
        <Button
          type="button"
          href="/changeride">
          Muuta
        </Button>
        &nbsp;
        {userIsDriver && <Button type="button" onClick={this.deleteRideFromList}>
          Poista
        </Button>}
        {userIsOnboard && <Button type="button" onClick={this.hopOffBoard} >
          Poistu kyydistä
        </Button>}
        <br />
        <Button type="button" onClick={this.showMessages}>
          Näytä kyytiin liittyvät viestit
        </Button>
      </div>
    );
  }
}

export default NicknameRide;
