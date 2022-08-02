import * as React from "react";
import Destinations from "./components/Destinations";
import Guests from "./components/Guests";
import ChooseDate from "./components/ChooseDate";
import "./App.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HotelIcon from "@mui/icons-material/Hotel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Form() {
  const [errors, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [count, setCount] = useState(0);

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

  function errorHandler(val, num) {
    //if value is null
    if (JSON.stringify(val) === JSON.stringify({}) && num === 0) {
      return 2;
      //"button not pressed.";
    } else if (JSON.stringify(val) === JSON.stringify({}) && num > 0) {
      return 3;
      //"button pressed and no errors.";
    } else {
      return 4;
      //"errors are present.";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
    console.log(dest);
    setFormErrors(validate(formValues));
    let value = errorHandler(formErrors, count);
    setCount(count + 1);
    if (value === 3) {
      setIsSubmitted(true);
    }
  }

  if (isSubmitted && count > 0) {
    return (
      <Navigate
        to={`/search?destination_id=${dest}&checkin=${
          startDate ? startDate.toISOString().split("T")[0] : ""
        }&checkout=${
          endDate ? endDate.toISOString().split("T")[0] : ""
        }&lang=${lang}&currency=${currency}&guests=${
          parseInt(adult) + parseInt(children)
        }`}
        state={
          [dest,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
          lang,
          currency,
          adult,
          children]
        }
      />
    );
  }

  // document.body.style.background = "#bbd1ea";
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HotelIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hotel Booking
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Destinations
                  setDestHandler={setDest}
                  dest={dest}
                  formErrors={formErrors}
                  autoFocus
                  id="destination"
                  name="Destination"
                />
              </Grid>
              <p> Please enter number of guests per room</p>
              <Guests
                setAdultHandler={setAdult}
                setChildrenHandler={setChildren}
                setRoomHandler={setRoom}
                room={room}
                children={children}
                adult={adult}
                formErrors={formErrors}
              />

              <Grid item xs={12}>
                <ChooseDate
                  setStartDateHandler={setStartDate}
                  setEndDateHandler={setEndDate}
                  startDate={startDate}
                  endDate={endDate}
                  formErrors={formErrors}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search for hotels
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
