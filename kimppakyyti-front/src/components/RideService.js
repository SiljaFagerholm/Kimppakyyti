import React, { Component } from "react";

const posturl =
  "https://kimppakyytiapi.azurewebsites.net/api/Ride/PostOfferRideAsync";

export function OfferNewRide(offer) {
  fetch(posturl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname: offer.nickname,
      startAddress: offer.startAddress,
      targetAddress: offer.targetAddress,
      startTime: offer.startTime,
      endTime: offer.endTime,
      offeringRide: true,
      mondayFrequency: offer.mondayFrequency,
      tuesdayFrequency: offer.tuesdayFrequency,
      wednesdayFrequency: offer.wednesdayFrequency,
      thursdayFrequency: offer.thursdayFrequency,
      fridayFrequency: offer.fridayFrequency,
      saturdayFrequency: offer.saturdayFrequency,
      sundayFrequency: offer.sundayFrequency
    })
  })
    .then(res => {
      console.log("OfferNewRide", res);
      this.setState({ offer: {} });
      this.props.history.push("/ridesearchpage");
    })
    .catch(err => {
      console.error("OfferNewRidevirhe", err);
    });
}
