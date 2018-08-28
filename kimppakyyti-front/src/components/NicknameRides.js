import React, { Component } from "react";
import NicknameRide from "./NicknameRide";



class  NicknameRides extends Component{
    render() {
        var nickRides = this.props.rides
        .map(function(ride, i){
            return (<NicknameRide singleride={ride} key={i}/>)
        });
        return(
            <div>
                <ul>{nickRides}</ul>
            </div>
        )
    }
}

export default NicknameRides;