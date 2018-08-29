import React, {Component} from "react";
import {deleteRideFromApi} from "./RideService";

class NicknameRide extends Component {

    delteRideFromList = () => {
        deleteRideFromApi(this.props.singleride.id, ()=> {
            this.props.deleteRideFromList(this.props.singleride.id)
        });
        
    }
    render(){
        return (
            <div>
                <p>Nickname: {this.props.singleride.nickname}</p>
                <p>Mistä: {this.props.singleride.startAddress}</p>
                <p>Mihin: {this.props.singleride.targetAddress}</p>
                <p>Aikaväli: {this.props.singleride.startTime} - {this.props.singleride.endTime}</p>
                <p>Paikkoja jäljellä: {this.props.singleride.seatsLeft}</p>
                <p>
                <button>Muuta</button>
                <button type="button" onClick={this.delteRideFromList}>Poista</button>
                </p>
            </div>
        )
    }
}
    
export default NicknameRide;