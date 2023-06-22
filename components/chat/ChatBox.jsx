import React from 'react'
import ChatUsers from './users'
import { useRouter } from 'next/router'
import { Theme } from '../Profile'
import {useAtom } from 'jotai';

const Chatbox = ({children}) => {
    const router = useRouter()
    const [dark, setDark ] = useAtom(Theme)


  return (
    <div className={` ${router.pathname !== "/chat"? "max-w-fit lg:block md:block hidden " : " w-screen"}   ${dark ? "bg-gradient-to-br  from-gray-800 to-green-600 text-white" : "bg-gradient-to-br  from-emerald-300"}`}      >
        {router.pathname.includes("chat") &&

            
            <ChatUsers/>
        }
{children}
    </div>
  )
}

export default Chatbox
