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
import NicknameRides from "./NicknameRides";

const urlGetNicknameRides =
  "https://kimppakyytiapi.azurewebsites.net/api/ride/getallrides";
var allRides = [];

class ProfileAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      list: []
    };
  }

  componentDidMount() {
    getProfile((err, profile) => {
      this.setState({ profile: profile });
    });
    this.getNicknameRides();
  }
  getNicknameRides = () => {
    fetch(urlGetNicknameRides)
      .then(result => result.json())
      .then(data => {
        allRides = data.filter(x => x.nickname === this.state.profile.nickname);

        this.setState({ list: allRides });
      });
  };

  render() {
    return (
      isLoggedIn() && (
        <div>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <Card>
                <CardImg src={this.state.profile.picture} alt="profile" />
                <CardBody>
                  <CardTitle>Profiili</CardTitle>
                  <CardText>
                    Nimi: {this.state.profile.name}
                    <br />
                    Käyttäjätunnus: {this.state.profile.nickname}
                  </CardText>
                  <CardTitle>Kyydit</CardTitle>
                  <CardText>
                    <NicknameRides rides={this.state.list} />
                  </CardText>
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
