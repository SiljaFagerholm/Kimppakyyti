import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";
import MessageList from "./MessageList";

class RideMessages extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {}, messages: this.DUMMY_DATA };
    }

    DUMMY_DATA = [
        {
            SenderId: "Ville", RecipientId: "Kalle", MessageText: "Moikka vaan!", RideId: this.props.RideId
        },
        {
            SenderId: "Kalle", RecipientId: "Ville", MessageText: "No moi moi!", RideId: this.props.RideId
        }

    ];
    render() {

        return <MessageList messages={this.state.messages} profile={this.state.profile} RideId={this.props.RideId} />;

    }

}
export default RideMessages;