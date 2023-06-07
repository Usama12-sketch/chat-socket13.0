import React from 'react'
import ChatUsers from './users'
import { useRouter } from 'next/router'

const Chatbox = ({children}) => {
    const router = useRouter()


  return (
    <div className={` ${router.pathname !== "/chat"? "max-w-fit lg:block md:block hidden " : " w-screen"}  bg-gradient-to-br  from-emerald-300`}>
        {router.pathname.includes("chat") &&

            
            <ChatUsers/>
        }
{children}
    </div>
  )
}

export default Chatbox
