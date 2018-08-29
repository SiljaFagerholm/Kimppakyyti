import React, { Component } from "react";
import RideList from "./RideList";
import moment from "moment";
import DatePicker from "./Date";
import { Button } from "reactstrap";

class LookingForRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(),
      endTime: moment(),
      startAddress: "",
      targetAddress: "",
      searchUrl: "",
      list: []
    };
    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);
  }

  startTimeChanged(st) {
    this.setState({ startTime: st });
  }

  endTimeChanged(et) {
    this.setState({ endTime: et });
  }

  handleChangeTarget(event) {
    this.setState({
      targetAddress: event.target.value
    });
  }

  handleChangeStart(event) {
    this.setState({
      startAddress: event.target.value
    });
  }

  handleChangeUrl = () => {
    console.log(JSON.stringify(this.state.startTime));
    let start = this.modifyDateString(this.state.startTime);
    let end = this.modifyDateString(this.state.endTime);

    let url =
      "https://kimppakyytiapi.azurewebsites.net/api/Ride/GetSearchRidesCustomerAsync?startTime=" +
      encodeURIComponent(start) +
      "&endTime=" +
      encodeURIComponent(end) +
      "&startAddress=" +
      encodeURIComponent(this.state.startAddress) +
      "&targetAddress=" +
      encodeURIComponent(this.state.targetAddress);
    console.log("URL", url);
    this.setState({
      searchUrl: url
    });
    this.GetEveryRide(url);
  };

  GetEveryRide = url => {
    fetch(url)
      .then(result => {
        console.dir(result);
        result.json();
      })
      .then(data => {
        console.dir(data);
        if (data === undefined) {
          console.log("täällä ollaan");
          data = [{ targetAddress: "Ei löydy dataa" }];
        }
        console.log(data);
        this.setState({ list: data });
      })
      .catch(err => {
        console.log("Tapahtui virhe" + err);
      });
  };

  modifyDateString(date) {
    let temp = JSON.stringify(date);
    return temp.slice(1, temp.length - 1);
  }

  render() {
    return (
      <div>
        <h2>
          <label>Mistä: </label>
          <input
            maxLength="50"
            value={this.state.startAddress}
            name="startAddress"
            onChange={this.handleChangeStart.bind(this)}
            type="text"
            required
          />{" "}
          <br />
          <label>Minne: </label>
          <input
            maxLength="50"
            name="targetAddress"
            onChange={this.handleChangeTarget.bind(this)}
            value={this.state.targetAddress}
            type="text"
            required
          />
          <br />
          <div className="center left">
            <label>Aikaväli</label>
            <DatePicker />
            <DatePicker />
            <br />
          </div>
          <Button
            outline
            color="secondary"
            onClick={this.handleChangeUrl}
            type="button"
          >
            Etsi kyytiä
          </Button>{" "}
        </h2>
        <RideList rides={this.state.list} />
      </div>
    );
  }
}

export default LookingForRide;
