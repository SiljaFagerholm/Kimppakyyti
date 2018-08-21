import React, {Component} from 'react';
import Ride from './Ride';

class RideList extends Component {
    render() {

        var kaikki = this.props.rides
        .map(function(ride){
            return (<Ride singleride={ride} key={ride.id}/>)
        });
        return(
            <div>
                <ul>{kaikki}</ul>
            </div>
        )
    }
}

export default RideList;