import React, { Component } from "react";
import RideList from "./RideList";
import moment from "moment";
import { Button, Label, Input } from "reactstrap";
import DatePicker from "react-datepicker";

class LookingForRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(),
      endTime: moment(),
      startAddress: "",
      targetAddress: "",
      searchUrl: "",
      list: [],
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
    if (this.state.targetAddress === "") {
      this.setState({ targetAddress: "any" });
    }
    console.log("LookingForRiden historia: ", this.props.history)

    console.log(JSON.stringify(this.state.startTime));
    let start = this.modifyDateString(this.state.startTime);
    let end = this.modifyDateString(this.state.endTime);
    let url = "";

    url =
      "https://lada.azurewebsites.net/api/Ride/GetSearchRidesCustomerAsync?startTime=" +
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
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("Kaikki kyydit", data);
        this.setState({ list: data });
      });
  };
  //     .then(data => {
  //       if (data === undefined) {
  //         console.log("täällä ollaan");
  //         data = [{ targetAddress: "Ei löydy dataa" }];
  //       }
  //       this.setState({ list: data });
  //     })
  //     .catch(err => {});
  // };

  modifyDateString(date) {
    let temp = JSON.stringify(date);
    return temp.slice(1, temp.length - 1);
  }

  render() {
    return (
      <div>
        <Label>Mistä: </Label>
        <Input
          maxLength="50"
          value={this.state.startAddress}
          name="startAddress"
          onChange={this.handleChangeStart.bind(this)}
          type="text"
          required
        />{" "}
        <br />
        <Label>Minne: </Label>
        <Input
          maxLength="50"
          name="targetAddress"
          onChange={this.handleChangeTarget.bind(this)}
          value={this.state.targetAddress}
          type="text"
          required
        />
        <br />
        <div className="center left">
          <Label>Lähtö aikaisintaan</Label>
          <DatePicker
            onChange={this.startTimeChanged}
            selected={this.state.startTime}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="YYYY-MM-DD HH:mm"
            timeCaption="time"
          />{" "}
          <br />
          <Label>Lähtö viimeistään</Label>
          <DatePicker
            onChange={this.endTimeChanged}
            selected={this.state.endTime}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="YYYY-MM-DD HH:mm"
            timeCaption="time"
          />
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
        <br />
        <RideList rides={this.state.list} history={this.props.history} />
      </div>
    );
  }
}

export default LookingForRide;
