import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import  { useContext } from 'react';
const ChatUsers = () => {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/CRUD/getUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  return (
    <div className="  w-full  px-4 m-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Chat with Users</h1>

      <div className="flex flex-col">
        {users.map((user) => (
          <div key={user.id} className= " text-blue-500 bg-white rounded shadow m-1 p-4">


            <Link className=' flex' href={`/chat/${user.id}`}> 
            <div className='  overflow-hidden rounded-[3rem]  w-10 h-10 '> 
    <Image  src={user.image} height={60} width={40} alt='user image'/>
</div>
            <p className="text-lg font-bold mb-2">{user.name}</p>
            </Link>

            {/* Additional user information */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
