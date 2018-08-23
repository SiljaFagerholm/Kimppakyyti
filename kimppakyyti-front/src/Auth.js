import React from "react";

import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "melaaman.eu.auth0.com",
    clientID: "MG7lyZ0EGaUX5A3RZWChir4DbfFgRCtA",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://YOUR_AUTH0_DOMAIN/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
  }
}
