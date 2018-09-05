import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {} };
    }


    render() {
        return (
            <div>
                <p>{this.props.singlemessage.SenderId}:</p>
                <p>{this.props.singlemessage.MessageText}</p>
            </div>

        );
    }

}
export default Message;