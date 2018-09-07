const POSTURL =
  "https://lada.azurewebsites.net/api/Messages/Post";

const THREADURL =
  "https://lada.azurewebsites.net/api/Messages/GetByRideId?id=";
const urlDeleteMessage =
  "https://lada.azurewebsites.net/api/Messages/Delete?documentId=";

export default function getRideThread(id) {
  fetch(THREADURL + id).then(result => result.json());
}

export function haeLista(id) {
  console.log("haeLista käynnistyi!")
  fetch(THREADURL + id)
    .then(function (response) {
      if (!response.ok) {
        const errviesti = { status: response.status, statusText: response.statusText, viesti: "Listanhaku" }
        throw errviesti;
      }
      console.log(response)
      return response.json();
    });
}

function SendMessage(message, hasselhoff) {
  return fetch(POSTURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
    .then(function (response) {
      hasselhoff(response.status);
    })
    .catch(err => {
      console.error("SendMessagevirhe", err);
    });
}

function deleteMessageFromApi(id) {
  fetch(urlDeleteMessage + id, {
    method: "DELETE"
  });
}
export { SendMessage, deleteMessageFromApi }