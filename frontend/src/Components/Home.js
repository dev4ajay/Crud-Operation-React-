import React, { useEffect, useState } from 'react'
import { Link ,useParams } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl } from '../BaseUrl';
import { Button, Form ,Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import Loader from './pages/Loader';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";

function Home() {
  const {id} = useParams()
const [data ,setData] = useState([]);
const [search, setSearch] = useState(null);
const [searchText, setSearchText] = useState("");
const [loading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalTasks, setTotalTasks] = useState(1);
const [page ,setPage] = useState("")
const [pageLimit, setPageLimit] = useState(5);
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
const fetchInfo = ()=>{
  axios.get(`${BaseUrl}/tasks/?page=${currentPage}&limit=${pageLimit}`).then((res)=>{
    console.log(res);
    setTotalTasks(res.data.totalTasks)
    setPage(res.data.totalPages)
    setIsLoading(false)
    setData(res.data.tasks)
  
  })
}

const HandleDelete = (id)=>{

  axios.delete(`${BaseUrl}/tasks/${id}`).then((res)=>{
    console.log(res);
if(res.status === 200 ){
  toast.success("delete successfully")
  axios.get(`${BaseUrl}/tasks/`).then((res)=>{
    setIsLoading(false)
    setData(res.data.tasks)
  
  })
}
  })
}  

useEffect(()=>{
  fetchInfo(currentPage ,pageLimit);
  setTimeout(() => {
    setIsLoading(false);
  },  8000)

}
, [currentPage ,pageLimit]);


   

  return  (
    <>
    <div className='container border bg-white shadow mt-4 mb-4 '>
    <h2>All User Details</h2>
    <div className='d-flex justify-content-between mt-5 '> 

            
            <Link to='/create' ><Button className='btn-secondary'>Add + </Button></Link>
            <Link to='/' ><Button className='btn-danger'>Logout</Button></Link>
            </div>
          
            <div>
<input
          style={{ outline: "none", width:'40%'  }}
          value={search}
          className="form-control mt-3"
          placeholder="Search ...."
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        
</div>
{loading?(<Loader/>):(  
<Table className='table mt-5 table-responsive'>
           <thead>
             <tr>
               <th scope='col'>#</th>
               <th scope='col'>Name</th>
               <th scope='col'>Email</th>
               <th scope='col'>Action</th>
               <th scope='col'>**</th>
               <th scope='col'>**</th>
             </tr>
           </thead>
           <tbody>
           {data
            .filter((item) => {
              if (searchText !== "") {
                return (
                  item?.name
                    .toLowerCase()
                    .includes(searchText?.toLowerCase()) ||
                  item?.email.toLowerCase().includes(searchText?.toLowerCase())
                );
              } else {
                return item;

                // Assuming originalProductData is the unfiltered data.
              }
            }).map((eachdata, index) => (
            
              <tr key={eachdata.id}>
              <td> {(currentPage -1)*pageLimit + index + 1 }</td>
    <td>{eachdata.name}</td>
    <td>{eachdata.email}</td>
    <td>
      <Link to={`/update/${eachdata._id}`}>
        <Button variant="success"><FaEdit/></Button>
      </Link>
    </td>
    <td>
      <Link to={`/read/${eachdata._id}`}>
        <Button variant="primary"><CiRead/></Button>
      </Link>
    </td>
    <td>
      <Button variant="danger" onClick={(e) => HandleDelete(eachdata._id)}>
        <MdDelete/>
      </Button>
    </td>
  </tr>
))}
  {data.length > 0 && // Check if the original data has items
            data.filter((item) => {
              if (searchText !== "") {
                return (
                  item?.name
                    .toLowerCase()
                    .includes(searchText?.toLowerCase()) ||
                  item?.email.toLowerCase().includes(searchText?.toLowerCase())
                );
              } else {
                return true;
              }
            }).length === 0 && ( // Check if filtered data is empty
              <tr>
                <td colSpan="7" className="text-center">
                  No Data Found
                </td>
              </tr>
            )}

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
            > 
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
  
       </>
  )
}

export default Home