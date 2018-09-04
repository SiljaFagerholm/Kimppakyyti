import React, { Component } from "react";
import OfferedRide from "./OfferedRide";
import { Button } from "reactstrap";

const offerIdUrl =
  "https://lada.azurewebsites.net/api/Ride/GetByDocumentId?documentId=";

class OfferCreated extends Component {
  constructor(props) {
    super(props);
    this.state = { offer: [] };
  }

  componentDidMount() {
    this.getOffer();
  }

  getOffer = () => {
    var postedOfferId = localStorage.getItem("posti");
    fetch(offerIdUrl + postedOfferId)
      .then(result => result.json())
      .then(data => {
        this.setState({ offer: data });
      });
  };

  returnToFirstPage = () => {
    this.props.history.push("/firstpage");
  };

  returnToProfile = () => {
    this.props.history.push("/profileauth");
  };

  render() {
    // console.log("postedOfferId", postedOfferId);
    return (
      <div>
        <OfferedRide singleride={this.state.offer} />
        <p>
          <Button type="button" onClick={this.returnToFirstPage}>
            Palaa etusivulle
          </Button>
          <Button type="button" onClick={this.returnToProfile}>
            Siirry Profiiliin
          </Button>
        </p>
      </div>
    );
  }
}

export default OfferCreated;
