import React, {Component} from 'react';


class Ride extends Component {
    render(){
        return (
                <div>
                    <p>Nickname: {this.props.singleride.nickname}</p>
                    <p>Mistä: {this.props.singleride.startAddress}</p>
                    <p>Mihin: {this.props.singleride.targetAddress}</p>
                    <p>Aikaväli: {this.props.singleride.startTime} - {this.props.singleride.endTime}</p>
                    <p>Milloin: {this.props.singleride.when}</p>
                    <p>Hinta: {this.props.singleride.price}</p>
                    <p>
                    <button>Liity kyytiin</button>

                    </p>
                </div>
        )
    }
}

export default Ride;