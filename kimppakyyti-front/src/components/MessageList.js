import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import Message from "./Message";
import '../App.css';

class MessageList extends Component {


    render() {
        var self = this;
        var deletemessage = this.props.deletethis;

        var messages = self.props.thread.map(function (message) {
            return <Message singlemessage={message} key={message.id} deletethis={deletemessage} profile={self.props.profile} />;
        });
        return (
            <div>
                <div>{messages}</div>
            </div>


        );
    }

}
export default MessageList;