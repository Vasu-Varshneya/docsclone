import React from 'react'
import logo from '../images/logo.png'
import right from '../images/signUpRight.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa"
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CiPhone } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { api_based_url } from '../Helper'
const signup = () => {
  const navigate = useNavigate()
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [phone,setphone]=useState("")
  const [name,setname ]=useState("")
  const [error,setError]=useState("")
  const createuser = (e) => {
    e.preventDefault();
    fetch(api_based_url + "/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        phone: phone,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          if(data.success === false){
            setError(data.message)
          }
          else{
            navigate("/login");
          }
      });
  };
  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen min-w-screen bg-gray-200'>
        <div className='flex w-full items-center'>
          <div className='left flex flex-col ml-[100px] mb-3 w-[40%] mx-auto'>
            <img width={200} src={logo} alt='notthere' />
            <form onSubmit={createuser} action="">
              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>Username</p>
                <div className='inputbox'>
                  <i><FaUser /></i>
                  <input onChange={(e)=>{setusername(e.target.value)}} value={username} type="username" id="username" placeholder='Username' />
                </div>
              </div>

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>Phone No</p>
                <div className='inputbox'>
                  <i><CiPhone /></i>
                  <input onChange={(e)=>setphone(e.target.value)} value={phone} type="number" id="phone" placeholder='phone no' />
                </div>
              </div>

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>Name</p>
                <div className='inputbox'>
                  <i><FaUser /></i>
                  <input onChange={(e)=>setname(e.target.value)} value={name} type="name" id="name" placeholder='Name' />
                </div>
              </div>

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>email</p>
                <div className='inputbox'>
                  <i><AiOutlineMail /></i>
                  <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" id='email' placeholder='email' />
                </div>
              </div>

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>Password</p>
                <div className='inputbox'>
                  <i className='cursor-pointer '><FaEye /></i>
                  <input onChange={(e)=>setpassword(e.target.value)} value={password}  type="password" id='password' placeholder='password' />
                </div>
              </div>
              <p>Already have an account? <Link  to='/login'><span className='text-blue-500'>Login</span></Link></p>
              <button className='bg-zinc-500 hover:bg-zinc-600 h-10 w-[210px] mt-2'><Link to={'/login'}>SignUp</Link></button>
            </form>
          </div>
          <div className='right  '>
          <img src={right} className='flex justify-center m-44 p-5' width={400} alt="" />
        </div>
        </div>
        
      </div>
    </>
  )
}
export default signup

