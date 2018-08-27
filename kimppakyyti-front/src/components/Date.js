import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) { 
    console.log(date);   
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        onChange={this.handleChange}
        selected={this.state.startDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="YYYY-MM-DD HH:mm"
        timeCaption="time"        
      />
    );
  }
}

export default Date;
