import React, { Component } from "react";
import NicknameRide from "./NicknameRide";



class  NicknameRides extends Component{
    render() {
        var self = this;

        var nickRides = this.props.rides
        .map(function(ride){
            return (<NicknameRide singleride={ride} changeRide={self.props.changeRide} deleteRideFromList={self.props.deleteRideFromList} key={ride.id}/>)
        });
        return(
            <div>
                <div>{nickRides}</div>
            </div>
        )
    }
}

export default NicknameRides;