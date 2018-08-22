import React, {Component} from 'react';
import RideList from './RideList';

// let data = [
//     {
//         "id": 1,
//         "nickname": "Jooseppi",
//         "startlocation": "Helvetti",
//         "endlocation": "Taivas"
//     },
//     {
//         "id": 2,
//         "nickname": "Skuggeli",
//         "startlocation": "Kerava",
//         "endlocation": "Prisma"
//     }
// ];
const urlGetRides = "https://localhost:44337/api/ride/getallrides";
var wholeList = [];

class RideBox extends Component {
    constructor() {
        super();
        this.state = {list: []};
    }
    
    componentDidMount() {
        this.GetEveryRide();
    }

    GetEveryRide = () => {
        fetch(urlGetRides)
        .then(result => result.json())
        .then(data => {
            this.setState({list: data});
            wholeList = data;
            console.log(wholeList);
        });
    };

    render() {
        return (
            <div>
                <RideList rides={this.state.list}/>
            </div>
        )
    }
}

export default RideBox;