import React, {Component} from 'react';
import RideList from './RideList';

let data = [
    {
        "id": 1,
        "nickname": "Jooseppi",
        "startlocation": "Helvetti",
        "endlocation": "Taivas"
    },
    {
        "id": 2,
        "nickname": "Skuggeli",
        "startlocation": "Kerava",
        "endlocation": "Prisma"
    }
];

class RideBox extends Component {
    constructor(props) {
        super(props);
        this.state = {rides: data};
    }

    render() {
        return (
            <div>
                <RideList rides={this.state.rides}/>
            </div>
        )
    }
}

export default RideBox;