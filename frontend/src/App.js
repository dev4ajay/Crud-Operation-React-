
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Create from "./Components/Create";
import Update from "./Components/Update";
import Read from "./Components/Read";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Components/Home";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";




function App() {

  
  return (
    <div className="container" >
      <ToastContainer/>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deshboard" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={ <Update/>} />
          <Route path="/read/:id" element={ <Read/>} />
         
          </Routes>
          </Router>


    </div>
  );
}

export default App;

