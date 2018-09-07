import React, { Component } from "react";
import { isLoggedIn, getProfile } from "./AuthService";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";
import '../App.css';
import NicknameRides from "./NicknameRides";
import { ListGroup, ListGroupItem } from "reactstrap";

const urlGetNicknameRides =
  "https://lada.azurewebsites.net/api/Ride/GetAllRides";
var allRides = [];

class ProfileAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      phonenumber: "",
      list: []
    };
  }

  componentDidMount() {
    getProfile((err, profile) => {
      this.setState({ profile: profile });
      this.getNicknameRides();
    });
  }
  getNicknameRides = callback => {
    fetch(urlGetNicknameRides)
      .then(result => result.json())
      .then(data => {
        allRides = data.filter(x => x.nickname === this.state.profile.nickname);

        this.setState({ list: allRides });
      });
  };

  changeRide = id => {
    var tempList = this.state.list.filter(x => x.id !== id);

    this.setState({ list: tempList })
  }

  deleteRideFromList = id => {
    var tempList = this.state.list.filter(x => x.id !== id);

    this.setState({ list: tempList });
  };


  render() {
    return (

      isLoggedIn() && (
        <div className="profileContent">
          <Row className="row justify-content-center">
            <Col className="row justify-content-center">
              <Card>
                <CardImg src={this.state.profile.picture} alt="profile" />
                <CardBody>
                  <CardTitle>Profiili</CardTitle>
                  <CardText>
                    <ListGroup>
                      <ListGroupItem>
                        {" "}
                        Nimi: <br />
                        {this.state.profile.name}
                      </ListGroupItem>
                      <ListGroupItem>
                        {" "}
                        Käyttäjätunnus: <br />
                        {this.state.profile.nickname}
                      </ListGroupItem>
                    </ListGroup>
                  </CardText>
                  <br />
                  <CardTitle>Tarjotut kyydit</CardTitle>
                  <div>
                    <NicknameRides
                      rides={this.state.list}
                      changeRide={this.changeRide}
                      deleteRideFromList={this.deleteRideFromList}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    );
  }
}

export default ProfileAuth;