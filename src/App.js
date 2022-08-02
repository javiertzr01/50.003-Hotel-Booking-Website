import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Load_data from './Feature_2/load_data.js'
import FormPage from './Feature_4/form.js'
import Form from './Feature_1/src/Form.js'
import HotelPage from './Feature_3/hi_modified';
import Error from "./error.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form/>} exact/>
          <Route path="/search" element={<Load_data/>} />
          <Route path="/hotel" element={<HotelPage/>} />
          <Route path="/submission" element={<FormPage/>} />
          <Route path="/error" element={<Error/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
