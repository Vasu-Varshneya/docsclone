import React from 'react'
import logo from '../images/logo.png'
import { useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
import right1 from '../images/loginRight.png'
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { api_based_url } from '../Helper';
const Login = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, setError] = useState('')
  const handleclick = () => {
    navigate('/home')
  }
  const login = (e) => {
    e.preventDefault()
    fetch(api_based_url + '/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.success === true) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('userId', data.userId)
        setTimeout(() => {
          navigate("/home");
        }, 100);
      }
      else {
        setError(data.message)
      }
      

    })
  }
  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen min-w-screen bg-gray-200'>
        <div className='flex w-full items-center'>
          <div className='left flex flex-col ml-[100px] mb-3 w-[40%] mx-auto'>
            <img width={200} src={logo} alt='notthere' />
            <form onSubmit={login} action="">

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>email</p>
                <div className='inputbox'>
                  <i><AiOutlineMail /></i>
                  <input onChange={(e) => setemail(e.target.value)} value={email} type="email" id='email' placeholder='email' />
                </div>
              </div>

              <div className='inputcon'>
                <p className='text-[#FF6B6B]'>Password</p>
                <div className='inputbox'>
                  <i className='cursor-pointer '><FaEye /></i>
                  <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" id='password' placeholder='password' />
                </div>
              </div>
              <p className='text-red-500 text-[14px] my-2'>{error}</p>
              <p>Do not have an account? <Link to='/signup'><span className='text-blue-500'>Signup</span></Link></p>
              <button onClick={()=>{handleclick}} className='bg-zinc-500 hover:bg-zinc-600 h-10 w-[210px] mt-2'>
                <Link to={"/home"}>Login</Link></button>
            </form>
          </div>
          <div className='right  '>
            <img src={right1} className='flex justify-center m-44 p-5' width={400} alt="" />
          </div>
        </div>

      </div>
    </>
  )
}

export default Login
