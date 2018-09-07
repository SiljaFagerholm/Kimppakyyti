import React, { Component } from "react";
// import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import Message from "./Message";

class MessageList extends Component {


    render() {
        var self = this;
        var deletemessage = this.props.deletethis;
        console.log("Messagelistin deletethis" + this.props.deletethis);
        console.log("Messagelistin thread " + this.props.thread);
        var messages = self.props.thread.map(function (message) {
            return <Message singlemessage={message} key={message.id} deletethis={deletemessage} />;
        });
        return (
            <div>
                <div>{messages}</div>
            </div>


        );
    }

}
export default MessageList;