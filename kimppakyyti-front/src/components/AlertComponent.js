import React from "react";
import { Alert } from "reactstrap";

const AlertComponent = props => {
  return (
    <div>
      <Alert color="light">
        <h4 className="alert-heading">Huom!</h4>
        <p>{props.alertMessage}</p>
      </Alert>
    </div>
  );
};

export default AlertComponent;
