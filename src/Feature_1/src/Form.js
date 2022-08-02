import * as React from "react";
import Destinations from "./components/Destinations";
import Guests from "./components/Guests";
import ChooseDate from "./components/ChooseDate";
import "./App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Form() {
  const [errors, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  //useStates for guests:
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);

  //useStates for dates:
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //useStates for destinations:
  const [dest, setDest] = useState(null);

  const formValues = { dest, adult, children, room, startDate, endDate };
  const currency = "SGD";
  const lang = "en_US";

  function returnStrDate(date){
    if (!date){
      return date.toISOString().split('T')[0];
    }
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      //console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.adult) {
      errors.adult = "Number of adults are required!";
    } else if (values.adult < 1) {
      errors.adult = "At least 1 adult is required!";
    }
    if (!values.room) {
      errors.room = "Number of rooms are required!";
    } else if (values.room < 1) {
      errors.room = "At least 1 room is required!";
    }
    if (!values.startDate && !values.endDate) {
      errors.stayPeriod = "Stay period is required!";
    } else if (!values.endDate) {
      errors.endDate = "End date required";
    }
    if (!values.dest) {
      console.log(dest);
      errors.dest = "Destination required!";
    }
    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
    console.log(dest);
    setFormErrors(validate(formValues));
    //console.log(Object.keys(formErrors))
    if (0 === Object.keys(formErrors).length) {
      setIsSubmitted(true);
      if (isSubmitted){
        navigate(`/search?destination_id=${dest}&checkin=${startDate ? startDate.toISOString().split('T')[0] : ""}&checkout=${endDate ? endDate.toISOString().split('T')[0] : ""}&lang=${lang}&currency=${currency}&guests=${parseInt(adult)+parseInt(children)}`
        );
      }
    } 
    
  }

  document.body.style.background = "#bbd1ea";
  return (
    <div className="app">
      <div className="content">
        <div className="contain">
          <div className="destination">
            <Destinations
              setDestHandler={setDest}
              dest={dest}
              formErrors={formErrors}
            />
          </div>
          <div className="guest">
            <Guests
              setAdultHandler={setAdult}
              setChildrenHandler={setChildren}
              setRoomHandler={setRoom}
              room={room}
              children={children}
              adult={adult}
              formErrors={formErrors}
            />
          </div>
          <div className="parent-flex">
            <p>Please enter stay period: </p>
            <div className="calendar">
              <ChooseDate
                setStartDateHandler={setStartDate}
                setEndDateHandler={setEndDate}
                startDate={startDate}
                endDate={endDate}
                formErrors={formErrors}
              />
            </div>
          </div>
          <ButtonGroup className="search">
            <Button
              onClick={handleSubmit}
            >
              Search for hotels
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}