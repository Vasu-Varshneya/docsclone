import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../component/Navbar'
import logo from '../images/logo.png'
import { useState, useRef,useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { api_based_url } from '../Helper';
const createdocs = () => {
    const [error, seterror] = useState("")
    let { docsid } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const updateDoc = () => {
        fetch(api_based_url + "/uploadDoc", {
            mode: "cors",
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("userId"),
                docId: docsid,
                content: content
            })
        }).then(res => res.json()).then(data => {
            if (data.success === false) {
                seterror(data.message)
            }
            else {
                seterror("");
            }
        })
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
        }).catch((error)=>{
            console.log("Error in fetching a document",error)
            seterror("An error occured while fetching the document")
        })
    }
    useEffect(() => {
        getdoc();
    }, [])
    return (
        <>
            <div className='bg-gray-200 flex justify-center gap-5'>
                <img src={logo} alt="" />
                <Navbar />
            </div>
            <div className='p-2'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onChange={(e) => { setContent(e); updateDoc(); }}
                />
            </div>
        </>

    )
}

export default createdocs
