import React, { Component } from "react";

const url = "http://kimppakyytiapi.azurewebsites.net/api/ride/post";


export function AddNewRide(ride) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname: ride.nickname,
      startAddress: ride.startAddress,
      targetAddress: ride.targetAddress,
      price: ride.price,
      when: ride.when
    })
  }).then(res => console.log(res));
}

class AddRide extends Component {
  constructor() {
    super();
    this.state = {
      ride: {},
      redirect: false
    };
  }

  AddRide = e => {
    let rideTemp = {
        nickname: this.refs.nickname.value,
        startAddress: this.refs.startAddress.value,
        targetAddress: this.refs.targetAddress.value,
        price: this.refs.price.value,
        when: this.refs.when.value
    };

    AddNewRide(rideTemp);
    this.setState({ ride: {}, redirect: true });
    console.log("Heippa vaa");
  };
  render() {
    return (
      <div>
        <h2>Lisää kyyti</h2>
        <form onSubmit={this.AddRide}>
          <label>Käyttäjätunnus: </label>
          <input maxLength="50" ref="nickname" type="text" required />
          <label>Mistä: </label>
          <input maxLength="50" ref="startAddress" type="text" required />
          <label>Mihin: </label>
          <input maxLength="50" ref="targetAddress" type="text" required />
          <label>Hinta: </label>
          <input maxLength="50" ref="price" type="text" required />
          <label>Milloin: </label>
          <input maxLength="50" ref="when" type="text" required />
          <input value="Lisää" type="submit" />
        </form>
      </div>
    );
  }
}

export default AddRide;
