import React, {Component} from 'react';


class Ride extends Component {
    render(){
        return (
                <div>
                    <p>Nickname: {this.props.singleride.nickname}</p>
                    <p>Mistä: {this.props.singleride.startlocation}</p>
                    <p>Mihin: {this.props.singleride.endlocation}</p>
                    <p>
                    <button>Liity kyytiin</button>

                    </p>
                </div>
        )
    }
}

export default Ride;