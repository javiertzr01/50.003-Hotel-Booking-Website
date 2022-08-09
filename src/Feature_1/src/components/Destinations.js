import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function Destinations(props) {
  const { setDestHandler, formErrors } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (event, value) => {
    if (value) {
      setDestHandler(value["uid"]);
    } else {
      setDestHandler(null);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getData");
        if (response.data === null) {
          response.data = "";
        }
        setData(response.data);
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 50,
  });

  if (loading) {
    return (
      <div>
        <strong>Loading Destinations</strong>
        <Spinner
          animation="border"
          role="status"
          size="sm"
          className="spinner"
        ></Spinner>
      </div>
    );
  }
  return (
    <div>
      <p>Please choose your destination:</p>
      <Autocomplete
        id="combo-box-demo"
        getOptionLabel={(option) => option.term}
        //options={data}
        options={data}
        filterOptions={filterOptions}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option._id}>
            {option.term}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            data-testid="destinations"
            label="Destination"
            name="DestTest"
          />
        )}
        onChange={onChange}
      />
      <p className="errors">{formErrors.dest}</p>
    </div>
  );
}

export default Destinations;
