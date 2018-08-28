import React, {Component} from "react";

class NicknameRide extends Component {
    render(){
        return (
            <div>
                <p>Nickname: {this.props.singleride.nickname}</p>
                <p>Mistä: {this.props.singleride.startAddress}</p>
                <p>Mihin: {this.props.singleride.targetAddress}</p>
                <p>Aikaväli: {this.props.singleride.startTime} - {this.props.singleride.endTime}</p>
                <p>Paikkoja jäljellä: {this.props.singleride.seatsLeft}</p>
            </div>
        )
    }
}

export default NicknameRide;