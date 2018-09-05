import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";

class ComposeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {} };
    }


    render() {
        return (
            <div>
                <p>Tähän tulee viestinkirjoituspalikka</p>
            </div>

        );
    }

}
export default ComposeMessage;