import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
// import { isLoggedIn, getProfile } from "./AuthService";
import MessageList from "./MessageList";

class RideMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }



    render() {

        return (
            <div>

                <MessageList messages={this.props.thread} />
            </div>
        )

    }

}
export default RideMessages;