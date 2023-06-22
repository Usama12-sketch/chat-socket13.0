import React from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import { atom, useAtom } from 'jotai';


export const Theme = atom(false)
const Profile = () => {

  const [dark, setDark ] = useAtom(Theme)

    const session = useSession();
  console.log(session);
  return (
    <div className= {`flex justify-between   ${dark ? " bg-gray-600 text-white" : " bg-green-200"}`}>
      <ol className='m-2  flex gap-2'>

<div className=' rounded-2xl overflow-hidden  w-10 '> 
   {session.data?.user.image && <Image  src={session.data?.user.image} height={100} width={100} alt='user image'/>}
</div>

<h1 className=' text-xl p-1   hover:shadow-2xl duration-500 font-semibold bg-gradient-to-tr from-pink-400 rounded-md w-max'>
    {session.data?.user.name}
</h1>
        </ol>
<button className={` px-3  mx-10  bg-gradient-to-tr from-green-400   ${dark ? "bg-gradient-to-br  rounded-2xl  from-gray-800 to-green-600 text-white" : " rounded-md text-gray-600 bg-gradient-to-br  from-emerald-500"}`} onClick={()=> setDark((prev) => prev = !prev)}>

{
  dark ?
  <LightModeTwoToneIcon className=' text-4xl'/>
  
  :
<DarkModeTwoToneIcon className=' text-4xl'/>
}
  </button>
    </div>
  )
}

export default Profile
