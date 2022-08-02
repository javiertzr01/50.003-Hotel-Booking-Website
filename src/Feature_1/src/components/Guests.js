import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

function Guests(props) {
  const {
    setAdultHandler,
    setChildrenHandler,
    setRoomHandler,
    room,
    children,
    adult,
    formErrors,
  } = props;

  const handleChangeAdult = (event) => {
    //match all non digit chars to empty string
    setAdultHandler(event.target.value.replace(/\D/g, ""));
  };
  const handleChangeChildren = (event) => {
    setChildrenHandler(event.target.value.replace(/\D/g, ""));
  };
  const handleChangeRoom = (event) => {
    setRoomHandler(event.target.value.replace(/\D/g, ""));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={1} sm={4}>
        <TextField
          required
          fullWidth
          label="Rooms"
          name="room"
          data-testid="rooms"
          type="int"
          error={formErrors.room}
          className="boxesroom"
          onChange={handleChangeRoom}
          value={room}
        />
        <p className="errors">{formErrors.room}</p>
      </Grid>
      <Grid item xs={1} sm={4}>
        <TextField
          required
          fullWidth
          label="Adult"
          name="adult"
          data-testid="adults"
          type="int"
          error={formErrors.adult}
          onChange={handleChangeAdult}
          value={adult}
        />
        <p className="errors">{formErrors.adult}</p>
      </Grid>
      <Grid item xs={1} sm={4}>
        <TextField
          required
          fullWidth
          data-testid="children"
          label="Children"
          type="int"
          onChange={handleChangeChildren}
          value={children}
        />
      </Grid>
    </ThemeProvider>
  );
}
export default Guests;
