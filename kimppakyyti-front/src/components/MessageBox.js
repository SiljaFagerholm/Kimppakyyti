import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";
import RideMessages from "./RideMessages";
import ComposeMessage from "./ComposeMessage";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {}, RideId: "" };
    }

    componentDidMount() {
        this.getRideInfo();
    }
    getRideInfo = () => {
        var storedid = localStorage.getItem("profiili");
        this.setState({ RideId: storedid });
    }
    render() {
        return (
            <div>
                <RideMessages RideId={this.state.RideId} />
                <ComposeMessage />

            </div>

        );
    }

}
export default MessageBox;