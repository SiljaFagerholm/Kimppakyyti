const POSTURL =
  "https://kimppakyytiapi.azurewebsites.net/api/Ride/PostOfferRideAsync";
const GETURL = "https://kimppakyytiapi.azurewebsites.net/api/ride/getallrides";

export function getEveryRide() {
  let ride = fetch(GETURL).then(res => console.log(res));
  return ride;
}

export function searchRide() {}

export function OfferNewRide(offer) {
  fetch(POSTURL, {
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
      // this.setState({ offer: {} });
    })
    .catch(err => {
      console.error("OfferNewRidevirhe", err);
    });
}
