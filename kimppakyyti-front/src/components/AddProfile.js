import React, { Component } from "react";

const url = "https://kimppakyytiapi.azurewebsites.net/api/user/post";

export function AddNewProfile(user) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // image: profile.image,
      nickname: user.nickname,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phonenumber: user.phonenumber,
      address: user.address,
      city: user.city
    })
  }).then(res => console.log(res));
}

class AddProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      redirect: false
    };
  }

  AddProfile = e => {
    let userTemp = {
      // image: this.refs.image.value,
      nickname: this.refs.nickname.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      phonenumber: this.refs.phonenumber.value,
      address: this.refs.address.value,
      city: this.refs.city.value
    };

    AddNewProfile(userTemp);
    this.setState({ user: {}, redirect: true });
    alert("Olet rekisteröitynyt palveluun!");
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
