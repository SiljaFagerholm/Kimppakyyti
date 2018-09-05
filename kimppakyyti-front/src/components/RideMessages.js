import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import MessageList from "./MessageList";

class RideMessages extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: this.DUMMY_DATA };
    }

    DUMMY_DATA = [
        {
            SenderId: "Ville", RecipientId: "Kalle", MessageText: "Moikka vaan!", UserIsSender: true, i: 1
        },
        {
            SenderId: "Kalle", RecipientId: "Ville", MessageText: "No moi moi!", UserIsSender: false, i: 2
        }];

    render() {

        return (
            <div>
                <p>RideId: {this.props.RideId}</p>
                <MessageList messages={this.state.messages} />
            </div>
        )

    }

}
export default RideMessages;