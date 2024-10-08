import React, { useState,useEffect } from 'react'
import Navbar from '../component/Navbar'
import { FaPlus } from "react-icons/fa";
import { MdOutlineTitle, MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import deleteimg from "../images/delete.png"
import logo from '../images/logo.png'
import {api_based_url} from "../Helper";
import Docs from './Docs';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [createModelshow, setcreateModelshow] = useState(false)
  const [title, settitle] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [data, setdata] = useState(null)
  const createDoc=()=>{
    if(title===''){
      setError("Please enter title")
      console.log(error)
    }
    else{
      fetch(api_based_url+'/createDoc',{
        mode:'cors',
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          docName:title,
          userId:localStorage.getItem('userId')
        })
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          setcreateModelshow(false)
          navigate(`/createdocs/${data.docid}`)
          
        }
        else{
          setError(data.message)
        }
      }
      )
    }
  }
  const getdata=()=>{
    fetch(api_based_url+'/getAlldocs',{
      mode:'cors',
      method:'POST',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        userId:localStorage.getItem('userId')
      }),
    }).then(res=>res.json()).then(data=>{
      setdata(data.doc)
    })
  };
  useEffect(() => {
    getdata()
  }, [])
  
  return (
    <>
      <div className='bg-gray-200 flex justify-center gap-5'>
        <img src={logo} alt="" />
        <Navbar />
      </div>
      <div className='flex items-center justify-between gap-16'>
        <h3 className='mt-7 mb-3 text-3xl ml-28'>All documents</h3>
        <button className='btn-blue mt-7 mr-4' onClick={() => { setcreateModelshow(true);
          document.getElementById('title').focus();
         }}  ><i><FaPlus /></i>Create a new document
        </button>
      </div>
      <div className='allDocs px-[100px] mt-4'>
        {
          data ? data.map((el)=>{
            return (
              <>
              <Docs doc={el}/>
              </>
            )
          })
          :""
        }
      </div>
      {
        createModelshow ? <><div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
          <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg w-[30vw] h-[26.5vh]">
            <h3 className='text-2xl font-bold'>Create a new document</h3>
            <div className='inputCon mt-3'>
              <p className=' text-[14px] text-[#5a2121]'>Title</p>
              <div className="inputBox w-[100%] p-2">
                <i><MdOutlineTitle /></i>
                <input onChange={(e)=>{settitle(e.target.value)}} value={title} type="text" placeholder='title' id='title' name='title' required />
              </div>
              <div className='flex justify-center gap-24'>
                <button onClick={createDoc}  className='btn-blue'>Create a new document
                  <i className='cursor-pointer hover:text-red-400'><IoMdAdd /></i>
                </button>
                <button onClick={() => { setcreateModelshow(false) }} className='btn-blue'>Cancel
                  <i className='cursor-pointer hover:text-red-400'><MdCancel /></i>
                </button>
              </div>
            </div>
          </div>
        </div></> : ""
      }
      
    </>
  )
}

export default Home
