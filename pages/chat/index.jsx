import React from 'react'

const index = () => {
  return (
    <div>
      
    </div>
  )
}

export default index




// import React, { useEffect, useRef, useState,useContext } from 'react';

// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
// import SendMessage from '../../components/chat/sendMessage';

// import prisma from '../../utils/prisma'
// import { getSession, useSession } from 'next-auth/react'
// import { authOptions } from '../api/auth/[...nextauth]'
// import Image from 'next/image';

// import SocketIOClient from "socket.io-client";





// const SingleChat = ({messagess}) => {



//   const fetchChatMessages = async (otherId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/CRUD/chat/${otherId}`, {
//         headers: {
//           'Cache-Control': 'no-cache',
//         },
//       });
//       if(response.ok){
        
//         const data = await response.json();
        
//         socket.emit('Message', data);
//         return data;
//       }
//     } catch (error) {
//       console.error('Error fetching chat messages:', error);
//       return [];
//     }
//   };
  
//   const router = useRouter()
//   const rid = router.query.id
  
//  const a = useContext(NoteConetxt)
//  const { state, Set } = a
 
 
//  const id =  rid
//  const otherId = id
 
  
 
 
//  const { data: messages, isLoading, isError, refetch } = useQuery(
//    ['messages', otherId],
//    async () => await fetchChatMessages("646ca29af66ecd0af83d0eff"),
//    {
//      refetchOnWindowFocus: false,
//      staleTime: 0,
//      initialData: messagess,
//     }
//     );
    
//     // {session.data?.user.name}
    
  
//     async function sendcek(message) {
      
//       // const updatedMessages = [...messages, message];
   
//       await refetch()
//       // console.log(message)
//       // messages.push(message)
//       //  socket.emit('Message', messages);
//       // setMsg((list) => [...list, message]);      // router.replace(router.asPath) 
      
//     }
    
//     const session = useSession()
    
    
//   const inputRef = useRef(null);

//   // connected flag
//   const [connected, setConnected] = useState(false);

//   // init chat and message


//   const [chat, setChat] = useState([]);
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     // connect to socket server
//     const socket = SocketIOClient.connect(process.env.BASE_URL, {
//       path: "/api/socketio",
//     });

//     // log socket connection
//     socket.on("connect", async () => {
// await loadMessages()
//       console.log("SOCKET CONNECTED!", socket.id);
//       setConnected(true);
//     });

//     // update chat on new message dispatched
//     socket.on("message", (message) => {
//       chat.push(message);
//       setChat([...chat]);
//     });
//     socket.on("loadMsg", (messages) => {
//     const newarray = [...messages, ...chat]
//       setChat(newarray);
//     });

//     // socket disconnet onUnmount if exists
//     if (socket) return () => socket.disconnect();
//   }, []);

//   const loadMessages = async () => {
//     if (messages) {
    

//       // Loading messages
//       const resp = await fetch("/api/loadMsg", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(messages),
//       });
    
//     }
//   };
//   const sendMsg = async () => {
//     if (msg) {
//       // build message obj
//       const message = {
//         user:session.data?.user.name,
//         msg,
//       };

//       // dispatch message to other users
//       const resp = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       // reset field if OK
//       if (resp.ok) setMsg("");
//     }

//     // focus after click
//     inputRef?.current?.focus();
//   };

   

//     return (
//       <div>
// <h1 className=' bg-slate-700  rounded-sm w-max '>
//     {session.data?.user.name}
// </h1>
//    {session.data?.user.image && <Image href={session.data?.user.image} height={40} length={40} alt='user image'/>}
//       <div className=' flex flex-col overflow-y-scroll h-60 '  >
//       <h1>Single Chat</h1>
//       {chat && chat.map((message, index) => (
//         <div key={index}>
//             <p>{message.content}</p>
//           </div>
//          ))}

//          </div>
//       <SendMessage sendMsg={sendMsg} msg={msg} refetch={refetch} id={otherId} sendcek={sendcek} />
     
//     </div>
//   );
// };

// export default SingleChat;

// export const getServerSideProps = async ({req, params}) =>{
//   const session = await getSession({req, authOptions})
//   if(session){
//     let receiverId  = params.id
//     let sessionUserId = session.data?.user.id
//    let messagess = await prisma.message.findMany({
//     where: {
//       AND: [
        
//         { OR: [{ senderId: sessionUserId }, { receiverId: sessionUserId }  ] },
//         { OR: [ { receiverId: receiverId } ,{ senderId:  receiverId } ] },
//       ],
//     },
//     orderBy: {
//       timestamp: 'asc',
//     },
//     include:{
//       sender: true,
//     }
   
//   });
//         messagess = JSON.parse(JSON.stringify(messagess))
   
  
//     return{ props: {
//       messagess,  
      
//     }}
//   }

//   else{
  
//     return { props: { } }
//   }
//   }