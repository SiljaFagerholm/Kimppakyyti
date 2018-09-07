const POSTURL =
  "https://lada.azurewebsites.net/api/Ride/PostOfferRideAsync";

const UPDATERIDE =
  "https://lada.azurewebsites.net/api/Ride/EditRideAsync";

const SEARCHURL =
  "https://lada.azurewebsites.net/api/Ride/SearchRidesCustomerAsync";

const urlDeleteNicknameRides =
  "https://lada.azurewebsites.net/api/Ride/DeleteRide?documentId=";

export function searchRide() {
  fetch(SEARCHURL).then(result => result.json());
}

export function OfferNewRide(offer) {
  return fetch(POSTURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname: offer.nickname,
      startAddress: offer.startAddress,
      targetAddress: offer.targetAddress,
      startTime: offer.startTime,
      endTime: offer.endTime,
      offeringRide: true,
      // mondayFrequency: offer.mondayFrequency,
      // tuesdayFrequency: offer.tuesdayFrequency,
      // wednesdayFrequency: offer.wednesdayFrequency,
      // thursdayFrequency: offer.thursdayFrequency,
      // fridayFrequency: offer.fridayFrequency,
      // saturdayFrequency: offer.saturdayFrequency,
      // sundayFrequency: offer.sundayFrequency,
      onBoard: [],
      seatsLeft: offer.seatsLeft,
      price: offer.price
    })
  })
    .then(res => {
      console.log("OfferNewRide", res);
      return res.text().then(str => {
        console.log("OfferNewRide body", str);
        localStorage.setItem("posti", str);
      });
      // this.setState({ offer: {} });
    })
    .catch(err => {
      console.error("OfferNewRidevirhe", err);
    });
}

export function deleteRideFromApi(id, callback) {
  fetch(urlDeleteNicknameRides + id, {
    method: "DELETE"
  }).then(callback);
}
export function hopOff(id, seatsLeft, nickname, callback) {

  let url =
    "https://lada.azurewebsites.net/api/Ride/HopOffTheRideAsync?Id=" +
    encodeURIComponent(id) +
    "&seatsLeft=" +
    encodeURIComponent(seatsLeft) +
    "&nick=" +
    encodeURIComponent(nickname);
  console.log("URL", url);
  leaveRide(url, callback);
  alert("Olet poistunut kyydistä.");
}
function leaveRide(url, callback) {
  fetch(url, {
    method: "PUT", headers: {
      "Content-Type": "application/json"
    }
  }).then(res => { return res; }
  ).then(callback);;
}

var data = { star: 'example' };

export function updateRideOnApi(ride) {
  fetch(UPDATERIDE + ride.id, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': ride.id, 'startAddress': ride.startAddress, 'targetAddress': ride.targetAddress, 'price': ride.price,
      'seatsLeft': ride.seatsLeft, 'startTime': ride.startTime, 'endTime': ride.endTime
    })
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
  console.log("Päästiin tänne asti! Onko päivitetty tieto tietokannassa?")
}