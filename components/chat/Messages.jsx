import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from 'next/image';
const Messages = ({ session, chat, deleteMsg }) => {
  const reversedChat = [...chat].reverse(); // Create a reversed copy of the chat array

  return (
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
  );
};

export default Messages;
