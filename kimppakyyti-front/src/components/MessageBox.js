import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { isLoggedIn, getProfile } from "./AuthService";
import Ride from "./Ride";
import MessageList from "./MessageList";
import ComposeMessage from "./ComposeMessage";
import { SendMessage, deleteMessageFromApi } from "./MessageService";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}, RideId: "", thread: [], singleride: {}
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
        this.getRideDetails(storedid);
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
    getRide = (id, callback) => {
        var rideurl =
            "https://lada.azurewebsites.net/api/Ride/GetByDocumentIdAsync?documentId=";
        fetch(rideurl + id)
            .then(function (response) {
                if (!response.ok) {
                    const errviesti = { status: response.status, statusText: response.statusText, viesti: "RideDetailshaku" }
                    throw errviesti;
                }
                return response.json();
            })
            .then(function (olio) {
                callback(olio);
            });
    }
    getRideDetails = (id) => {
        this.getRide(id, function callback(olio) {
            this.setState({ singleride: olio });
            console.log(this.state.singleride)
        }.bind(this));
    }
    getUpdatedThread = (id) => {
        this.getThread(id,
            function callback(lista) {
                this.setState({ thread: lista });
                console.log("Updated thread: ", this.state.thread)
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
    deleteMessage = (deleteid) => {
        var threadid = this.state.RideId;

        deleteMessageFromApi(deleteid).then(function jeejee() {
            this.getUpdatedThread(threadid);
        }.bind(this));

    }
    render() {
        var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let start = new Date(this.state.singleride.startTime);
        start = start.toLocaleString("fi-FI", options);

        let end = new Date(this.state.singleride.endTime);
        end = end.toLocaleString("fi-FI", options);


        return (isLoggedIn && (

            <div>
                <ListGroup>

                    <ListGroupItem>
                        <h3>{this.state.singleride.startAddress} - {this.state.singleride.targetAddress}</h3><br />
                        {start} -{" "}
                        {end}<br />
                        Kuskina {this.state.singleride.nickname}
                    </ListGroupItem>


                </ListGroup>
                <MessageList thread={this.state.thread} deletethis={this.deleteMessage} />
                <ComposeMessage profile={this.state.profile} compose={this.SendNewMessage} ride={this.state.ride} />

            </div>)

        );
    }

}
export default MessageBox;