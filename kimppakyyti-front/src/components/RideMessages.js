import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import MessageList from "./MessageList";

class RideMessages extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: this.DUMMY_DATA };
    }
    componentDidMount() {

    }

    DUMMY_DATA = [
        {
            SenderId: "Ville", RecipientId: "Kalle", MessageText: "Moikka vaan!", UserIsSender: true, id: 1
        },
        {
            SenderId: "Kalle", RecipientId: "Ville", MessageText: "No moi moi!", UserIsSender: false, id: 2
        }];

    render() {

        return (
            <div>
                <MessageList messages={this.props.thread} />
            </div>
        )

    }

}
export default RideMessages;