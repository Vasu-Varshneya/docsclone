import React, { useState } from 'react'

import docsicon from '../images/docsIcon.png'
import { MdDelete, MdCancel } from "react-icons/md";
import deleteimg from "../images/delete.png"
import { api_based_url } from '../Helper';
import { useNavigate } from 'react-router-dom';
const Docs = ({ doc }) => {
  const [error, seterror] = useState(" ")
  const navigate = useNavigate()
  const [deleteModel, setdeletemodel] = useState(false)
  const handleclick = () => {
    navigate(`/createdocs/${doc.docId}`)
  }
  const getdoc = () => {
    fetch(api_based_url + "/getdoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsid
      })
    }).then((res) => res.json()).then((data) => {
      if (data.success === false) {
        seterror(data.message)
      }
      else {
        setContent(data.doc.content)
      }
    }).catch((error) => {
      console.log("Error in fetching a document", error)
      seterror("An error occured while fetching the document")
    })
  }
  const deletedoc = (id) => {
    fetch(api_based_url + '/deletedoc', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        docId: id,
        userId: localStorage.getItem('userId')
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        seterror(data.message)
      }
      else {
        alert(data.message)
      }
    })
  }
  return (
    <div className='cursor-pointer rounded-lg bg-gray-200 mx-auto mt-10 w-[1000px] h-[60px] transition-all hover:bg-slate-600 docs flex items-center justify-between'>
      <div className='left flex items-center gap-2 '>
        <button onClick={() => { handleclick; getdoc() }}>

          <img className='cursor-pointer' src={docsicon} alt="" />
        </button>
        <div>
          <h3 className='text-[20px]'>{doc.title}</h3>
          <p className='text-[14px] text-[#808080]'>
            Created In : {new Date(doc.date).toDateString()} | Last Updated : {new Date(doc.lastupdate).toDateString()}
          </p>
        </div>
      </div>
      <div className='right'>
        <i className='text-[30px] text-emerald-500 cursor-pointer hover:text-emerald-700' onClick={() => setdeletemodel(true)}>
          <MdDelete />
        </i>
      </div>
      {
        deleteModel ?
          <div className='deletedocs createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center'>
            <div className="deletemodel p-[15px] bg-[#fff] rounded-lg w-[30vw] h-[29vh]">
              <h3 className='text-[20px]'>Do you want to delete this document?</h3>
              <div className='flex flex-col items-center gap-3'>
                {/* Optional image */}
                <img src={deleteimg} alt="" />
                <div className='flex -mt-2 items-center gap-2 justify-between w-full'>
                  <button onClick={() => { deletedoc(doc._id) }} className='btn-red min-w-[48%]'>Delete the document</button>
                  <button className='btn-blue min-w-[48%]'>
                    Cancel <i className='cursor-pointer hover:bg-red-500' onClick={() => { setdeletemodel(false) }}><MdCancel /></i>
                  </button>
                </div>
              </div>
            </div>
          </div> : " "
      }
    </div>
  )
}

export default Docs

