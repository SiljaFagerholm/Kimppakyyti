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
        "https://kimppakyytiapi.azurewebsites.net/api/Ride/JoinTheRideAsync?Id=" +
        encodeURIComponent(this.props.singleride.id) +
        "&seatsLeft=" +
        encodeURIComponent(this.props.singleride.seatsLeft) +
        "&nick=" +
        encodeURIComponent(this.state.profile.nickname);
      console.log("URL", url);
      this.setState({
        searchUrl: url
      });
      this.joinRide(url);
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
