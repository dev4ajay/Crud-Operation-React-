
import React, { useEffect, useState} from "react";
import axios from "axios";
import {  useParams ,useNavigate, Link } from 'react-router-dom';
import { BaseUrl } from "../BaseUrl";
import {  Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Create() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  useEffect(()=>{
    axios
    .get(`${BaseUrl}/tasks/` ,)
      .then((result) => {
        setData(result.data.tasks.filter((userId)=> userId._id === id)[0]);
      }, (error) => {
        console.log(error.text);
      })

  },[])
  // console.log(data.Name)
  const [value ,setValue] =useState({
    name:"",
    email:"",
  })
    const HandleUpdate = (e) => {
      if (!value.name || !value.email) {
        toast.error("Please fill in all fields");
        return;
      }
      e.preventDefault();
      axios
      .patch(`${BaseUrl}/tasks/${id}` ,value)
      .then((res) => {
         
          if(res.status === 200){
              toast.success("Update User Successfully!")
              navigate("/deshboard")
          }
     
   
        }, (error) => {
          console.log(error.text);
        })
    }

       
       

     
      
  return (
    <>
    <div className="container w-60 vh-50 p-4  border bg-white shadow bg-light  mt-4"> 
   
        <h2>Update User</h2>
        <div>
        <Form onSubmit={HandleUpdate} >
    <Form.Group className="mb-3  col-md-6 col-sm-12" id="Name">
      <Form.Label style={{fontSize:'18px'}}>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Name" name="name" className="p-2" defaultValue={data?.name}  onChange={(e =>setValue({...value , name: e.target.value}))}  />
    </Form.Group>
    <Form.Group className="mb-3 col-md-6 col-sm-12" id="Email">
      <Form.Label style={{fontSize:'18px'}}>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" className="p-2"  name="email" defaultValue={data?.email}   onChange={(e =>setValue({...value , email: e.target.value}))}/>
    </Form.Group>
<div className="d-flex gap-3">
    <Button variant="success " className="mt-2" type="submit">
      Update    </Button>
      <Link to="/deshboard" ><Button variant="primary" className="mt-2">Back</Button> </Link>

    
      </div>
  </Form>
  </div>
  </div>
   
   </>
  )
}

export default Create