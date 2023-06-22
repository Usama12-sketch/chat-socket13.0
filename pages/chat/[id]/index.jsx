import React, { useEffect, useRef, useState,useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import SendMessage from '../../../components/chat/sendMessage';

import prisma from '../../../utils/prisma'
import { getSession, useSession } from 'next-auth/react'
import { authOptions } from '../../api/auth/[...nextauth]'

import io from "socket.io-client";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast';
import { deleteMsg, loadMessages } from '../../../utils/funtions';
import { atom, useAtom } from 'jotai';
import Messages from '../../../components/chat/Messages';

export const baseURL = atom("https://node-js-usama-project.onrender.com")

const SingleChat = ({messagess}) => {
  const session = useSession()
  const router = useRouter()
  
  const [baseURl] = useAtom(baseURL)

  console.log(baseURl, "url")
  // const baseURl = process.env.BASE || "http://localhost:3001"
  const socket = io(baseURl); // Replace with your server URL
  // const baseURl = "http://localhost:3001"
  
  router.query.page = 100
  const fetchChatMessages = async () => {
    try {
   
      let response = await fetch(`${baseURl}/api/messages` ,{
    
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          receiverId: await session.data?.user.id,
          sessionUserId:router.query.id
        })
      })
      if(response.ok){
        
        response = await JSON.parse(JSON.stringify(response))
        const data = await response.json();
        consolelog("dataz", data)
        // socket.emit('Message', data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }
  };
  
  
    const rid = router.query.id
    
    //  const a = useContext(NoteConetxt)
    //  const { state, Set } = a
    
    
    const id =  rid
    const otherId = id
    
    
    
    
    const { data: messages, isLoading, isError, refetch } = useQuery(
      ['messages', otherId],
     () => fetchChatMessages("646ca29af66ecd0af83d0eff"),
   {
     refetchOnWindowFocus: false,

    //  staleTime: 0,
     initialData: messagess,
    }
    );
    
    // {session.data?.user.name}
    
    
    async function sendcek(message) {
   
      await refetch()
   
      
    }
    
    
    
    const inputRef = useRef(null);
    
    // connected flag
    const [connected, setConnected] = useState(false);
    
    // init chat and message
    
    
    const [noti, setNoti] = useState("dgdgd")
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  
  useEffect(() => {
  if (session){

    socket.on("connect", async () => {
      
      await loadMessages(baseURl, messages , toast)
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });
    
    // update chat on new message dispatched
    socket.on("message", (message) => {
      setChat((prevChat) => {
        const newmsg = message;
        const updatedChat = [...prevChat, newmsg];
        console.log("messages", updatedChat);
        return updatedChat;
      });
      toast.success("Message sent") 
    });
    
    socket.on("Typing",  (message) => {
      setNoti(message)
toast.success("typing...")
    });
    // loadMsges
    socket.on("loadMsg", (messages) => {
      const newarray = [...messages, ...chat]
      setChat(newarray);
      toast.success("Messages loaded") 
    });
    socket.on("deleteMsg", (messageId) => {

      setChat(prevChat => prevChat.filter(obj => obj.id !== messageId));
      toast.success("Message Deleted") 
      
    });
    
    // socket disconnet onUnmount if exists
    if (socket) return () => socket.off();
  }
  }, []);


  
  
 

  function typing() {
    const type ="typing..."
    // socket.emit("Typing", type)
  }

    if(session.status === "unauthenticated"){
      router.replace('/api/auth/signin')
    }
    else if(session.status === "authenticated"){
    
      const reversedChat = [...chat].reverse(); // Create a reversed copy of the chat array
    
    return (
      <div className={` flex flex-col bg-slate-300 hover:shadow-2xl duration-500 hover:bg-slate-400 w-screen text-black ${router.pathname === "/chat"? "lg:block md:block hidden" : ""}`}>
         <Toaster />

{/* profile */}


        
        {/* messages */}
       <Messages chat={chat} session={session} deleteMsg={deleteMsg} toast={toast}  />
    
         
         
         {/* send messages */}
      <SendMessage toast={toast} typing={typing} setMsg={setMsg} msg={msg} refetch={refetch} id={otherId} sendcek={sendcek} />
     
    </div>
  );
}
};

export default SingleChat;

export const getServerSideProps = async ({req, params}) =>{
  const session = await getSession({req, authOptions})
  if(session){
    let page = params.page
    let receiverId  = params.id
    let sessionUserId = session.data?.user.id
   let messagess = await prisma.message.findMany({
    
    skip:page,
    where: {
  
      AND: [
        
        { OR: [{ senderId: sessionUserId }, { receiverId: sessionUserId }  ] },
        { OR: [ { receiverId: receiverId } ,{ senderId:  receiverId } ] },
      ],
    },
    orderBy: {
      timestamp: 'asc',
    },
    include:{
      sender: true,
    }
   
  });
  
 
  messagess = JSON.parse(JSON.stringify(messagess))
  
    return{ props: {
      messagess,  
      
    }}
  }

  else{
  
    return { props: { } }
  }
  }