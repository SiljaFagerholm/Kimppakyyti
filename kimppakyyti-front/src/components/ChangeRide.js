import React, { Component } from 'react';
import '../App.css';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { updateRideOnApi } from './RideService';
require('../FirstPage.css');

class ChangeRide extends Component {
    constructor(props) {
        super(props)

        this.state = {

        };

        this.fromRef = React.createRef()
        this.toRef = React.createRef()
        this.priceRef = React.createRef()
        this.seatsLeftRef = React.createRef()
        this.timeFromRef = React.createRef()
        this.timeToRef = React.createRef()

    }

    changeRide = () => {
        console.log("Nyt voin muuttaa kyydin asetuksia!")
        
        let changedInfo = {
            'id': this.props.singleride.id, 'startAddress': this.fromRef.value, 'targetAddress': this.toRef.value, 
            'price': this.priceRef.value, 'seatsLeft': this.seatsLeftRef.value, 'startTime': this.timeFromRef.value,
            'endTime': this.timeToRef.value
        }
        updateRideOnApi(changedInfo);
        console.log(changedInfo);

        // Tähän joku siirtymävaihe? Ks. referenssi

    };

    render() { 
        return (
            <div className="left">
            <Form className="Row">
            <FormGroup classID="infoFields">
            
            <Label>Mistä</Label>
            <Input
                innerRef={input => (this.fromRef = input)}
                type="text"
                name="startAddress"
                id="startAddress"
                placeholder="Lähtöpaikka"
                maxLength="50"
                value={this.props.singleride.startAddress}
                // onChange={this.handleChangeStart.bind(this)}
                required
            />
            <br />
            <Label>Minne</Label>
            <Input
                innerRef={input => (this.toRef = input)}
                type="text"
                name="targetAddress"
                id="targetAddress"
                placeholder="Saapumispaikka"
                maxLength="50"
                value={this.props.singleride.targetAddress}
                // onChange={this.handleChangeTarget.bind(this)}
                required
            />
            <br />
            <Label>Kyydin hinta</Label>
            <Input
                innerRef={input => (this.priceRef = input)}
                type="number"
                name="price"
                id="price"
                placeholder="Hinta"
                maxLength="2"
                value={this.props.singleride.price}
                // onChange={this.handleChangePrice.bind(this)}
                required
            />
            <br />
            <Label>Paikkoja vapaana</Label>
            <Input
                innerRef={input => (this.seatsLeftRef = input)} 
                type="number"
                name="seatsLeft"
                id="seatsLeft"
                placeholder="Vapaat paikat"
                maxLength="1"
                value={this.props.singleride.seatsLeft}
                // onChange={this.handleChangeSeats.bind(this)}
                required
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö aikaisintaan</Label>
            <DatePicker

                innerRef={input => (this.timeFromRef = input)} 
                id="startTime" 
                // onChange={this.startTimeChanged}
                selected={this.props.singleride.startTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="YYYY-MM-DD HH:mm"
                timeCaption="time"
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö viimeistään</Label>
            <DatePicker
                innerRef={input => (this.timeToRef = input)} 
                id="endTime"
                // onChange={this.endTimeChanged}
                selected={this.props.singleride.endTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="YYYY-MM-DD HH:mm"
                timeCaption="time"
            />
            </FormGroup>
            </Form>
            <br />
            <Button
                outline
                color="secondary"
                onClick={this.changeRide}
                type="button"
            >
                Muuta tietoja
            </Button>{" "}
            </div>
        );
    }
}

export default ChangeRide;