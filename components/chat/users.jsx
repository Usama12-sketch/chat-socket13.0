import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Theme } from '../Profile';
import { useAtom } from 'jotai';


const ChatUsers = () => {
const session = useSession()
  const router = useRouter()
  let path = router.query.id
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/CRUD/getUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  console.log(router)
  const [dark, setDark ] = useAtom(Theme)

  
  return (
    <div className="  w-full  px-4 m-2 sm:px-6 lg:px-8">
     
      <h1 className="text-4xl font-bold mb-4 bg-clip-text bg-gradient-to-br text-transparent from-purple-500 to-green p-2 ">Users</h1>

      <div className="flex flex-col">
        {users.map((user) => (
          <div key={user.id} className= {` h-24 flex items-center justify-center w-full text-blue-500 ${dark ? "bg-gradient-to-br  rounded-2xl  from-gray-800 to-green-60" : " rounded-m bg-gradient-to-br  from-emerald-500"} rounded shadow m-1 p-2 `}>
              

            <Link className={` flex gap-1 duration-500 h-full w-full ease-in-out  items-center ${path === user.id ? "border-4 hover:border-2 border-green-300" : " bg-green-200 hover:bg-green-300" }`} href={`/chat/${user.id}`}>

            <div className='  overflow-hidden rounded-[5rem] w-15 h-15 '> 
    <Image  src={user.image} height={70} width={70} alt='user image'/>
</div>
            <p className="text-lg font-bold mb-2">{user.name}</p>
            </Link>
 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
