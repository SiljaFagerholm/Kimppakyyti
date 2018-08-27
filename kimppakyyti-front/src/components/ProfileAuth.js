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

class ProfileAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    getProfile((err, profile) => {
      console.log(profile);
      this.setState({ profile: profile });
    });
  }

  render() {
    console.dir(this.state.profile);

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
