import React, { useEffect, useRef, useState,useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import SendMessage from '../../../components/chat/sendMessage';

// import prisma from '../../../utils/prisma'
import { getSession, useSession } from 'next-auth/react'
import { authOptions } from '../../api/auth/[...nextauth]'

import SocketIOClient from "socket.io-client";
import Messages from '../../../components/chat/Messages';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';




const SingleChat = ({messagess}) => {
  const session = useSession()
  const router = useRouter()
  
  
  
  const fetchChatMessages = async (otherId) => {
    try {
      // const response = await fetch(`http://localhost:3000/api/CRUD/chat/${otherId}`, {
      //   headers: {
      //     'Cache-Control': 'no-cache',
      //   },
      // });
      let response = await fetch(`https://node-js-usama-project.onrender.com/api/messages` ,{
    
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
        
        // response = await JSON.parse(JSON.stringify(response))
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
      async () => await fetchChatMessages("646ca29af66ecd0af83d0eff"),
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


  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  
  useEffect(() => {
  if (session){

    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });
    
    // log socket connection
    socket.on("connect", async () => {
      
      await loadMessages()
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
    });
    
    // loadMsges
    socket.on("loadMsg", (messages) => {
      const newarray = [...messages, ...chat]
      setChat(newarray);
    });
    socket.on("deleteMsg", (messageId) => {
      setChat(prevChat => prevChat.filter(obj => obj.id !== messageId));
      
    });
    
    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }
  }, []);
  
  const loadMessages = async () => {
    if (messages) {
      // Loading messages
      const resp = await fetch("/api/loadMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });
      
    }
  };

  const deleteMsg = async (id) =>{

    const resp = await fetch(`/api/chat/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    
  }
  
  const sendMsg = async (newMessage) => {
   
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newMessage),
      });
      
      // reset field if OK
      if (resp.ok) setMsg("");
      // }
      
      // focus after click
      inputRef?.current?.focus();
    };
    if(session.status === "unauthenticated"){
      router.replace('/api/auth/signin')
    }
    else if(session.status === "authenticated"){
    
      const reversedChat = [...chat].reverse(); // Create a reversed copy of the chat array

    
    return (
      <div className={` flex flex-col bg-slate-300 hover:shadow-2xl duration-500 hover:bg-slate-400 w-screen text-black ${router.pathname === "/chat"? "lg:block md:block hidden" : ""}`}>
        
{/* profile */}
<ol className='m-2  flex gap-2'>
<div className=' rounded-2xl overflow-hidden  w-10 '> 
   {session.data?.user.image && <Image  src={session.data?.user.image} height={100} width={100} alt='user image'/>}
</div>

<h1 className=' text-xl p-1 hover:shadow-2xl duration-500 font-semibold bg-gradient-to-tr from-pink-400 rounded-md w-max'>
    {session.data?.user.name}
</h1>
        </ol>
        {/* messages */}
        <div className='flex h-full flex-col-reverse overflow-y-auto bg-gradient-to-tr from-blue-400 to-red-400'>
      {reversedChat.map((message, index) => {
        const messageDate = new Date(message.timestamp);
        const messageDateString = messageDate.toLocaleDateString();
        const messageTimeString = messageDate.toLocaleTimeString();

        return (
          <div key={index}>
            <ol className='relative  h-24 m-2 p-2'>


              <ol
                className={`flex flex-col w-max p-1 rounded-md shadow-lg ${
                  session.data?.user.name === message.sender.name
                    ? 'right-0 top-0 absolute bg-gradient-to-br from--400'
                    : ' bg-gradient-to-tr from-green-400'
                }`}
              >
                <div className='flex gap-3 items-center'>

            <div className=' overflow-hidden rounded-2xl  w-10 '> 

   {session.data?.user.image && <Image  src={message.sender.image} height={100} width={100} alt='user image'/>}
</div>
                <p className='text-xl font-semibold'>{message.content}</p>
                {session.data?.user.name === message.sender.name && (
                  <button className=' w-max' onClick={() => deleteMsg(message.id)}>
                    <DeleteOutlineIcon/>
                  </button>
                )}
                </div>
                <div>
                  <span className=' text-sm bg-gray-400 rounded-sm'>
                     {messageTimeString} : {messageDateString} 
                     </span>
                  
                
                </div>
              </ol>
            </ol>
          </div>
        );
      })}
    </div>
    
{/* <Messages session={session} deleteMsg={deleteMsg} chat={chat}/> */}
         
         
         {/* send messages */}
      <SendMessage sendMsg={sendMsg} setMsg={setMsg} msg={msg} refetch={refetch} id={otherId} sendcek={sendcek} />
     
    </div>
  );
}
};

export default SingleChat;

export const getServerSideProps = async ({req, params}) =>{
  const session = await getSession({req, authOptions})
  if(session){
    let receiverId  = params.id
    let sessionUserId = session.data?.user.id
  //  let messagess = await prisma.message.findMany({
  //   where: {
  //     // senderId:receiverId,
  //     // senderId:sessionUserId,
  //     AND: [
        
  //       { OR: [{ senderId: sessionUserId }, { receiverId: sessionUserId }  ] },
  //       { OR: [ { receiverId: receiverId } ,{ senderId:  receiverId } ] },
  //     ],
  //   },
  //   orderBy: {
  //     timestamp: 'asc',
  //   },
  //   include:{
  //     sender: true,
  //   }
   
  // });
  
  // let messagess = await fetch(`http://localhost:3001/api/messages/${receiverId},${sessionUserId}`)
  let messagess = await fetch(`https://node-js-usama-project.onrender.com/api/messages` ,{
    
    headers: {
      "Content-Type": "application/json",
    },
    method:"POST",
    body:JSON.stringify({
      receiverId,
      sessionUserId
    })
  })
  // messagess = JSON.parse(JSON.stringify(messagess))
  messagess = await messagess.json()
    return{ props: {
      messagess,  
      
    }}
  }

  else{
  
    return { props: { } }
  }
  }