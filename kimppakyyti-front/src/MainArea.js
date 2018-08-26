import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            Tähän sivut
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainArea;
