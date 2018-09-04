import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { getProfile } from "./AuthService";

class Ride extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  handlePutUrl = () => {
    getProfile((err, profile) => {
      this.setState({ profile: profile });
      let url =
        "https://lada.azurewebsites.net/api/Ride/JoinTheRideAsync?Id=" +
        encodeURIComponent(this.props.singleride.id) +
        "&seatsLeft=" +
        encodeURIComponent(this.props.singleride.seatsLeft) +
        "&nick=" +
        encodeURIComponent(this.state.profile.nickname);
      console.log("URL", url);
      this.setState({
        searchUrl: url
      });
      if (this.props.singleride.seatsLeft !== 0) {
        alert("Olet kyydissä!");
        this.joinRide(url);
      } else {
        alert("Autossa ei ole tilaa.");
      }
    });
  };

  joinRide = url => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("joinride", res);
        return res;
      })
      .catch(err => console.error("joinRide error", err));
  };

  render() {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    let start = new Date(this.props.singleride.startTime);
    start = start.toLocaleString("fi-FI", options);

    let end = new Date(this.props.singleride.endTime);
    end = end.toLocaleString("fi-FI", options);
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
            {" "}
            Aikaväli: {start} - {end}
          </ListGroupItem>
          <ListGroupItem>
            Vapaat paikat: {this.props.singleride.seatsLeft}
          </ListGroupItem>
          <ListGroupItem>Hinta: {this.props.singleride.price}</ListGroupItem>
        </ListGroup>
        <br />
        <Button
          outline
          color="secondary"
          onClick={this.handlePutUrl}
          type="button"
        >
          Liity kyytiin
        </Button>
      </div>
    );
  }
}

export default Ride;
