import React, { Component } from "react";

// const url = "..."

// export function AddNewProfile(profile) {
//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         image: profile.image,
//         firstName: profile.firstName,
//         lastName: profile.firstName,

//       })
//     }).then(res => console.log(res));
//   }

class AddProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      redirect: false
    };
  }
  render() {
    return (
      <div>
        {" "}
        <label>Kuva: </label>
        <input maxLength="50" ref="image" type="text" required />
        <label>Etunimi: </label>
        <input maxLength="50" ref="firstName" type="text" required />
        <label>Sukunimi: </label>
        <input maxLength="50" ref="lastName" type="text" required />
      </div>
    );
  }
}

export default AddProfile;
