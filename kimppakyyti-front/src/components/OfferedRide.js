import React, { Component } from "react";

class OfferedRide extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


    render(){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let start = new Date(this.props.singleride.startTime);
        start = start.toLocaleString("fi-FI", options);
  
        let end = new Date(this.props.singleride.endTime);
        end = end.toLocaleString("fi-FI", options);
        return (
                <div>
                    <p>Mistä: {this.props.singleride.startAddress}</p>
                    <p>Mihin: {this.props.singleride.targetAddress}</p>
                    <p>Aikaväli: {start} - {end}</p>
                    <p>Vapaat Paikat: {this.props.singleride.seatsLeft}</p>
                    <p>Hinta: {this.props.singleride.price}</p>
                    
                </div>
        )
    }
}

export default OfferedRide;
