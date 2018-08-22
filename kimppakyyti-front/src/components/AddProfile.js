import React, { Component } from "react";
// import AlertComponent from "./AlertComponent";

const url = "https://localhost:44337/api/user/post";
// const url = "/api/user/GetAllUsers/";

export function AddNewProfile(profile) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // image: profile.image,
      nickname: profile.nickname,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phonenumber: profile.phonenumber,
      address: profile.address,
      city: profile.city
    })
  }).then(res => console.log(res));
}

class AddProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      redirect: false
    };
  }

  AddProfile = e => {
    let profileTemp = {
      // image: this.refs.image.value,
      nickname: this.refs.nickname.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phonenumber: this.refs.phonenumber.value,
      address: this.refs.address.value,
      city: this.refs.city.value
    };

    AddNewProfile(profileTemp);
    this.setState({ profile: {}, redirect: true });
  };
  render() {
    return (
      <div>
        <h2>Lisää profiili</h2>
        <form onSubmit={this.AddProfile}>
          {/* <label>Kuva: </label>
          <input maxLength="50" ref="image" type="text" required /> */}
          <label>Käyttäjätunnus: </label>
          <input maxLength="50" ref="nickname" type="text" required />
          <label>Etunimi: </label>
          <input maxLength="50" ref="firstName" type="text" required />
          <label>Sukunimi: </label>
          <input maxLength="50" ref="lastName" type="text" required />
          <label>Sähköposti: </label>
          <input maxLength="50" ref="email" type="text" required />
          <label>Puhelinnumero: </label>
          <input maxLength="50" ref="phonenumber" type="text" required />
          <label>Osoite: </label>
          <input maxLength="50" ref="address" type="text" required />
          <label>Kaupunki: </label>
          <input maxLength="50" ref="city" type="text" required />
          <input value="Lisää" type="submit" />
        </form>
      </div>
    );
  }
}

export default AddProfile;
