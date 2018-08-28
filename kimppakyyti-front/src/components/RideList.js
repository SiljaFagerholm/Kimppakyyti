import React, {Component} from 'react';
import Ride from './Ride';

class RideList extends Component {
    render() {
//sort ei toimi. Jos jää aikaa niin katotaa.
        var everything = this.props.rides
        .map(function(ride, i){
            return (<Ride singleride={ride} key={i}/>)
    }).sort(function (r1, r2) {
        return r2.i - r1.i;
    });
        return(
            <div>
                <ul>{everything}</ul>
            </div>
        )
    }
}

export default RideList;