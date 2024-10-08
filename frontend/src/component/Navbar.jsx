import React from 'react'
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { api_based_url } from '../Helper';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [error, seterror] = useState("")
  const navigate = useNavigate()
  const logout=()=>{
    fetch(api_based_url+'/logout',{
      mode:'cors',
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        userId:localStorage.getItem('userId')
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success===false){
        seterror(data.message)
      }
      else{
        localStorage.removeItem('userId')
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('token')
        navigate('/login')
      }
    })
  }
  return (
    <div className='right flex items-center gap-2 justify-end'>
        <div className='inputbox w-30vw t-4 '>
            <i><CiSearch /></i>
            <input  placeholder="Search" type="text" />
        </div>
        <button onClick={logout} className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg transition-all hover:bg-red-700 border-0'>
          Logout
        </button>
        <Avatar size='40px'  className='flex cursor-pointer rounded-full' name="Wim Mostmans"></Avatar>
    </div>
  )
}

export default Navbar
