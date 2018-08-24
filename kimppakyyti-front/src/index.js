import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

// import authentication from "react-azure-adb2c";

const app = ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

export default app;
