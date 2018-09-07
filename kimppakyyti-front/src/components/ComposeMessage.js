import React, { Component } from "react";
import { Button } from "reactstrap";
import { isLoggedIn } from "./AuthService";
import '../App.css';

class ComposeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            MessageText: "", SenderId: "", SendDate: ""
        };
    }

    componentDidMount() {
        this.setState({ SenderId: this.props.profile.nickname });
    }

    MessageTextChanged = (msg) => { this.setState({ MessageText: msg.target.value }) }
    Send = (e) => {
        e.preventDefault();
        var sender = this.props.profile.nickname;
        var msg = {};
        msg.SenderId = sender;
        msg.MessageText = this.state.MessageText;
        msg.SendDate = new Date();
        this.setState({ SenderId: sender });
        console.log(this.props.profile.nickname);
        this.props.compose(msg);
        this.setState({
            MessageText: "", SenderId: "", SendDate: ""
        })


    }

    render() {
        return (
            isLoggedIn() && (

                <div className="Row">
                    <form onSubmit={this.Send}>
                        <input className="m-2" style={{ padding: '1%' }} type="text" placeholder="Viesti" value={this.state.MessageText} onChange={this.MessageTextChanged} />
                        <Button className="btn-success m-2" style={{ padding: '1%' }} onClick={this.Send}>Lähetä viesti</Button>
                    </form>
                </div>
            )

        );
    }

}
export default ComposeMessage;