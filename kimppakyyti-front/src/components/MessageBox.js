import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";
import RideMessages from "./RideMessages";
import ComposeMessage from "./ComposeMessage";
import { SendMessage, deleteMessageFromApi } from "./MessageService";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}, RideId: "", thread: []
        }
    }
    componentDidMount() {
        getProfile((err, profile) => {
            this.setState({ profile: profile });
        });
        console.log("Messagebox componentdidmountin profiili:" + this.state.profile.nickname);
        this.getRideInfo();
    }
    getRideInfo = () => {
        var storedid = localStorage.getItem("ride");
        this.getUpdatedThread(storedid);
        this.setState({ RideId: storedid });
    }

    getThread = (id, callback) => {
        var THREADURL =
            "https://lada.azurewebsites.net/api/Messages/GetByRideId?id=";
        console.log("getThread käynnistyi!")
        fetch(THREADURL + id)
            .then(function (response) {
                if (!response.ok) {
                    const errviesti = { status: response.status, statusText: response.statusText, viesti: "Listanhaku" }
                    throw errviesti;
                }
                return response.json();
            })
            .then(function (lista) {
                callback(lista);
            });
    }

    getUpdatedThread = (id) => {
        this.getThread(id,
            function callback(lista) {
                this.setState({ thread: lista });
                console.log(this.state.thread)
            }.bind(this));
    }

    SendNewMessage = (msg) => {

        console.log(msg);
        msg.RideId = this.state.RideId;
        SendMessage(msg,
            function hasselhoff() {
                this.getUpdatedThread(this.state.RideId);
            }.bind(this));

    }
    render() {
        return (isLoggedIn && (

            <div>
                <RideMessages thread={this.state.thread} />
                <ComposeMessage profile={this.state.profile} compose={this.SendNewMessage} />

            </div>)

        );
    }

}
export default MessageBox;