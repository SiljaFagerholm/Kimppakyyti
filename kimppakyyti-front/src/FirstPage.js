import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  TabContent,
  TabPane,
  Label,
  Input
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { getProfile } from "./components/AuthService";
import { OfferNewRide, searchRide } from "./components/RideService";
import LookingForRide from "./components/LookingForRide";
require("./FirstPage.css");


class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      offer: {},
      redirect: false,
      startTime: moment(),
      endTime: moment(),
      activeTab: "1",
      startAddress: "",
      targetAddress: "",
      profile: {},
      informationTemp: {},
      seatsLeft: "1",
      price: ""
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

  movetoRideSearch = () => {
    let informationTemp = {
      nickname: this.state.profile.nickname,
      startAddress: this.state.startAddress,
      targetAddress: this.state.targetAddress,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    };
    searchRide(informationTemp);
    this.setState({ informationTemp: informationTemp });
    this.props.history.push("/ridesearchpage");
  };

  OfferRide = e => {
    let informationTemp = {
      nickname: this.state.profile.nickname,
      startAddress: this.state.startAddress,
      targetAddress: this.state.targetAddress,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      seatsLeft: this.state.seatsLeft,
      price: this.state.price
    };
    console.log(informationTemp);
    OfferNewRide(informationTemp).then(() => {
      this.props.history.push("/offercreated");
    });
    this.setState({ offer: informationTemp });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  handleChangeRideList(event) {
    this.setState({
      offer: event.target.value
    });
  }
  componentDidMount() {
    getProfile((err, profile) => {
      //console.log(profile);
      this.setState({ profile: profile });
    });
  }

  handleChangeSeats(event){
    this.setState({
      seatsLeft: event.target.value
    })
  }
  handleChangePrice(event){
    this.setState({
      price: event.target.value
    })
  }

  render() {
    return (
      <div className="left">
        <Nav className="Row" tabs>
          <NavItem>
            <NavLink 
              style={{ cursor: 'pointer' }}
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Tarjoan kyytiä
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              style={{ cursor: 'pointer' }}
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Etsin kyytiä
            </NavLink>
          </NavItem>
        </Nav>
        <br />
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Label>Mistä</Label>
            <Input
              type="text"
              name="startAddress"
              placeholder="Helsinki"
              maxLength="50"
              value={this.state.startAddress}
              onChange={this.handleChangeStart.bind(this)}
              required
            />
            <br />
            <Label>Minne</Label>
            <Input
              type="text"
              name="targetAddress"
              placeholder="Espoo"
              maxLength="50"
              value={this.state.targetAddress}
              onChange={this.handleChangeTarget.bind(this)}
              required
            />
            <br />
            <Label>Kyydin hinta</Label>
            <Input
              type="number"
              name="price"
              placeholder=""
              maxLength="2"
              value={this.state.price}
              onChange={this.handleChangePrice.bind(this)}
              required
            />
            <br />
            <Label>Paikkoja vapaana</Label>
            <Input
              type="number"
              name="seatsLeft"
              placeholder="1"
              maxLength="1"
              value={this.state.seatsLeft}
              onChange={this.handleChangeSeats.bind(this)}
              required
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö aikaisintaan</Label>
            <DatePicker
            
              onChange={this.startTimeChanged}
              selected={this.state.startTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="YYYY-MM-DD HH:mm"
              timeCaption="time"
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö viimeistään</Label>
            <DatePicker
              onChange={this.endTimeChanged}
              selected={this.state.endTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="YYYY-MM-DD HH:mm"
              timeCaption="time"
            />
            <br /><br />
            <Button
              outline
              color="secondary"
              onClick={this.OfferRide}
              type="button"
            >
              Tarjoa kyytiä
            </Button>{" "}
            <br />
          </TabPane>
          <TabPane tabId="2">
            <LookingForRide />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default FirstPage;
