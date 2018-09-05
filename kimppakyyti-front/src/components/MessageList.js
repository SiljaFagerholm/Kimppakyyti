import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import Message from "./Message";

class MessageList extends Component {


    render() {
        var self = this;
        var messages = this.props.messages.map(function (message, i) {
            return <Message singlemessage={message} key={i} />;
        });
        return (
            <div>
                <div>{messages}</div>
            </div>

        );
    }

}
export default MessageList;