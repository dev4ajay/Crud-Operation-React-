
import React, { useState} from "react";
import axios from "axios";
import {  useParams ,useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { BaseUrl } from "../BaseUrl";


function Create() {
    const navigate = useNavigate();
  
    const [value ,setValue] =useState({
      name:"",
      email:"",
    })
   

    const HandleSubmit = (e) => {
        // e.preventDefault();
        if (!value.name || !value.email) {
          toast.error("Please fill in all fields");
          return;
        }

        axios
        .post(`${BaseUrl}/tasks/` ,value)
        .then((res) => {
          
           
           setValue(res.data)
            if(res.status === 201){
                toast.success("Add Users Successfully!")
                navigate("/deshboard")
            }
       
     
          }, (error) => {
            console.log(error.text);
          })
      }
  return (
    <div className="container w-60 vh-50 p-4  bg-light  mt-4 border bg-white shadow "> 
 
        <h2>Add User</h2>
    <Form.Group className="mb-3 col-md-6 col-sm-12 " id="Name">
      <Form.Label style={{fontSize:'18px'}}>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Name" name="name" className="p-2"  onChange={(e =>setValue({...value , name: e.target.value}))} required />
    </Form.Group>
    <Form.Group className="mb-3 col-md-6 col-sm-12 " id="Email">
      <Form.Label style={{fontSize:'18px'}}>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name="email" className="p-2"  onChange={(e=> setValue({...value , email: e.target.value}))} required/>
    </Form.Group>


<div className="d-flex  gap-3">
    <Button variant="success"  className="mt-2" type="submit" onClick={HandleSubmit}>
      Submit
    </Button>
      <Link to="/deshboard" ><Button variant="primary" className="mt-2">Back</Button> </Link>
      </div>
  </div>
  )
}

export default Create