import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";
import moment from "moment";
import { deleteMessageFromApi } from "./MessageService";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {} };
        this.deletemessage = this.deletemessage.bind(this);
    }
    deletemessage = (e) => {
        e.preventDefault();
        deleteMessageFromApi(this.props.singlemessage.id);

    }
    render() {
        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        let sendDateString = new Date(this.props.singlemessage.sendDate);
        sendDateString = sendDateString.toLocaleString("fi-FI", options);
        return (
            <div>
                <ListGroup>
                    <ListGroupItem>
                        {this.props.singlemessage.senderId} || {sendDateString} <br />
                        "{this.props.singlemessage.messageText}"<br />

                        <Button onClick={this.deletemessage}>Poista viesti</Button>
                    </ListGroupItem>
                </ListGroup>
            </div>

        );
    }

}
export default Message;