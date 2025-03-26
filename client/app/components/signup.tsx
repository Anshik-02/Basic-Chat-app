"use client"
import React, { useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function Signup({user,setSignedIn,setUserValue}:{user:any,setSignedIn:any,setUserValue:any}) {
const socket = io("http://192.168.1.9:3001", { transports: ["websocket", "polling"] });
const submitHandler=()=>{
console.log(user)
setSignedIn(true)
socket.emit("user joined", user.current);
}

const onChangeHandler=(e:any)=>{
  user.current=(e.target.value)
setUserValue(e.target.value)
}



  return (
    <div className='h-screen w-full bg-[#A6CFD5] flex justify-center items-center flex-col'>
      <div className='border-2 rounded-xl  text-center flex flex-col p-10 m-10'>
        <h2 className='font-semibold text-5xl text-gray-600 mb-5'>Chat room</h2>
<input type='text' placeholder='Your name' className='bg-white m-3 h-10 text-center rounded-xl placeholder:text-gray-500 text-black' onChange={onChangeHandler} />
<button className='rounded-xl px-5 py-2 bg-blue-400 m-3 hover:brightness-90 cursor-pointer' onClick={submitHandler}>Join room</button>
</div>

    </div>
  )
}
