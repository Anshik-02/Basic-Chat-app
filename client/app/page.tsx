"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Chats from "./components/chats";
import Signup from "./components/signup";


let socket:any; 

export default function Home() {
  const [userValue,setUserValue]=useState("")
const [signedIn,setSignedIn]=useState(false)
const user=useRef("")
const [message,setMessage]=useState<{ chat: string; user: string }[]>([])
const [chat, setChat] = useState<string>("");



    useEffect(() => {
    if (!socket) {
      socket = io("http://192.168.1.9:3001", { transports: ["websocket", "polling"] });
    }
  socket.on("chats",(data:any)=>{
    console.log(data)
    setMessage((e)=>[...e,data])

  })

socket.emit("user dissconneted", user.current);
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
{signedIn&&<div>
<Chats user={user.current} setChat={setChat} submit={()=>{socket.emit("message",{chat:chat,user:user.current})} } message={message} chat={chat} userValue={userValue}/></div>}
{!signedIn&&
<Signup user={user} setSignedIn={setSignedIn} setUserValue={setUserValue}/>

}
    </div>
  );
}
