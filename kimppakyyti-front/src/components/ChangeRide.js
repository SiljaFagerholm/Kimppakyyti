import React, { Component } from 'react';
import {
    Form,
    Label,
    Input,
    Button
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { updateRideOnApi } from './RideService';

class ChangeRide extends Component {
    state = {

    }

    changeRide = () => {
        console.log("Nyt voin muuttaa kyydin asetuksia!")
        updateRideOnApi(this.props.singleride.id, () => {
            this.props.changeRide(this.props.singleride.id);
        });
    };

    render() { 
        return (
            <div>
            <Form>
            <Label>Mistä</Label>
            <Input
                type="text"
                name="startAddress"
                placeholder="Lähtöpaikka"
                maxLength="50"
                value={this.props.startAddress}
                // onChange={this.handleChangeStart.bind(this)}
                required
            />
            <br />
            <Label>Minne</Label>
            <Input
                type="text"
                name="targetAddress"
                placeholder="Saapumispaikka"
                maxLength="50"
                value={this.props.targetAddress}
                // onChange={this.handleChangeTarget.bind(this)}
                required
            />
            <br />
            <Label>Kyydin hinta</Label>
            <Input
                type="number"
                name="price"
                placeholder="Hinta"
                maxLength="2"
                value={this.props.price}
                // onChange={this.handleChangePrice.bind(this)}
                required
            />
            <br />
            <Label>Paikkoja vapaana</Label>
            <Input
                type="number"
                name="seatsLeft"
                placeholder="Vapaat paikat"
                maxLength="1"
                value={this.props.seatsLeft}
                // onChange={this.handleChangeSeats.bind(this)}
                required
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö aikaisintaan</Label>
            <DatePicker

                // onChange={this.startTimeChanged}
                selected={this.props.startTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="YYYY-MM-DD HH:mm"
                timeCaption="time"
            />
            <br />
            <Label style={{ float: 'left' }}>Lähtö viimeistään</Label>
            <DatePicker
                // onChange={this.endTimeChanged}
                selected={this.props.endTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="YYYY-MM-DD HH:mm"
                timeCaption="time"
            />
            <Button 
                onClick={this.changeRide}
            ></Button>
            </Form>
            </div>
        );
    }
}

export default ChangeRide;