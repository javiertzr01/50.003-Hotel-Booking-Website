import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function ChooseDate(props) {
  const {
    setStartDateHandler,
    setEndDateHandler,
    startDate,
    endDate,
    formErrors,
  } = props;

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDateHandler(start);
    setEndDateHandler(end);
  };

  return (
    <div data-testid="stayPeriod">
      <p>Please enter stay period:</p>
      <DatePicker
        className="datepicker"
        selectsRange={true}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="dd/MM/yy"
      />
      <p className="errors">{formErrors.stayPeriod}</p>
      <p className="errors">{formErrors.endDate}</p>
    </div>
  );
}
export default ChooseDate;
