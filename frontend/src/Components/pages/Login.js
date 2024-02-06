import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../BaseUrl';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BiSolidHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function Login() {
  const navigate = useNavigate();
  const [value , setValue] = useState({
    
    email:"",
    password: "",
   
  })
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!value.email || !value.password) {
      toast.error("Please fill in all fields");
      return;
    }
    axios.post(`${BaseUrl}/users/login`, value)
      .then((res) => {
        console.log(res);
        setValue(res.data.user)
        if(res.status === 200){
          toast.success("!! Login successfully !!")
          navigate("/deshboard")}
      })
      .catch((error) => {
        console.error('login failed:', error);
        // Handle errors if needed
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
      <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
     
      <div className="relative mt-10 h-px bg-gray-300">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
        </div>
      </div>
      <div className="mt-10">
        <form action="#">
     
         
        <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" onChange={(e=>setValue({...value , email : e.target.value}))} required id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"  />
                  </div>
                  <div>
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={handlePasswordChange}
          id="password"
          placeholder="*****"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >

          {showPassword ? <BiSolidHide/> : <BiShow/>}
        </button>
      </div>
    </div>
          <div className="flex items-center mb-6 mt-4">
            <div className="flex ml-auto">
              <Link to="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</Link>
            </div>
          </div>
  
          <div className="flex w-full">
            <button type="submit" onClick={HandleSubmit} className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
              <span className="mr-2 uppercase">Login</span>
              <span>
                <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
      <p className="mb-0 mt-2 pt-1 text-base  font-semibold">
              Don't have an account?
              <Link
                to="/register"
                className="text-danger no-underline transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >Register</Link
              >
            </p>
    </div>
  </div>
  )
}

export default Login