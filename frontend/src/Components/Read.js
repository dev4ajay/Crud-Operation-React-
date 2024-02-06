import React, { useEffect, useState } from 'react'
import { Link ,useParams } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl } from '../BaseUrl';
import { Button, Form ,Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import Loader from './pages/Loader';
import { FaEdit } from "react-icons/fa";
function Read() {
  const {id} = useParams()
const [data ,setData] = useState([]);
const [currentPage ,setCurrentPage] = useState(1);
const [pageLimit ,setPageLimit] = useState(5);
const [lodding , setLoading] = useState(true)
const [totalPages ,setTotalpage] = useState(1)
const [totalTasks, setTotalTasks] = useState(1);
const [page , setPage] = useState("")
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
const fetchInfo = ()=>{
  axios.get(`${BaseUrl}/tasks/?page=${currentPage}&limit=${pageLimit}`).then((res)=>{
    setData(res.data.tasks)
    setTotalTasks(res.data.totalTasks)
    setPage(res.data.totalPages)
    setLoading(false)
  })
}


useEffect(()=>{
  fetchInfo(currentPage , pageLimit);
  setTimeout(() => {
    setLoading(false);
  },  8000)
} ,[currentPage , pageLimit])


   

  return (
    <>
  <div className='container d-flex w-100 vh-50 justify-content-center align-center bg-light mt-5'>
<div className='w-100 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h2>Read Details</h2>
            {lodding?(<Loader/>):( <Table className='table mt-5'>
           <thead>
             <tr>
               <th scope='col'>#</th>
               <th scope='col'>Name</th>
               <th scope='col'>Email</th>
               <th scope='col'>Action</th>
            
             </tr>
           </thead>
           <tbody>
             {data.map((eachdata , index) => (
               <tr >
                 <td>{index + 1}</td>
                 <td>{eachdata.name}</td>
                 <td>{eachdata.email}</td>
                 <td>
                <Link to={`/update/${eachdata._id}`} ><Button variant="success"  ><FaEdit/></Button></Link>
              
              </td>
             <td>  <Link to="/deshboard" ><Button>Back</Button> </Link></td>
              
               </tr>
             ))}
           </tbody>
         </Table>)}
           
         <div className="mt-3 mb-4">
         <div className="d-flex  mt-3 mb-2 ms-4 me-4 gap-2">
          <div>Show</div>
          <div>
            <select
              id="cars"
              name="cars"
              value={pageLimit}
              onChange={(e) => setPageLimit(e.target.value)}
            > <option value="">Select Page Limit</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
          <div>entries</div>
          <div className='d-flex gap-3 '>
          <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="ms-2"style={{border:'none' ,borderRadius:'5%' ,width:'150px' ,height:'40px'  ,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          Previous
        </button>
        <span className="ms-2">Page {currentPage} of {totalTasks}entries</span>
        <button className=" ms-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === page}
          style={{border:'none' ,borderRadius:'5%' ,width:'150px' ,height:'40px'  ,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
        >
          Next
        </button>
        </div>
        </div>
     
      </div>
            </div>
      
       </div>
  
       </>
  )
}

export default Read