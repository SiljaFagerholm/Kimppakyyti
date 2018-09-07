import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import '../App.css';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {} };
        this.deletemessage = this.deletemessage.bind(this);
    }
    deletemessage = (e) => {
        e.preventDefault();
        // console.log("This.props.deletethis: " + this.props.deletethis);
        this.props.deletethis(this.props.singlemessage.id);

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
        var userIsAuthor = this.props.singlemessage.senderId === this.props.profile.nickname;
        return (
            <div>
                <ListGroup className="Row">
                    <ListGroupItem className="Col">
                        {this.props.singlemessage.senderId} || {sendDateString} <br />
                        "{this.props.singlemessage.messageText}"<br />
                        {userIsAuthor && <Button className="btn-sm btn-danger m-2" style={{ color: 'black', opacity: '0.8' }} onClick={this.deletemessage}>Poista</Button>}<br />
                    </ListGroupItem>
                </ListGroup>
            </div>

        );
    }

}
export default Message;