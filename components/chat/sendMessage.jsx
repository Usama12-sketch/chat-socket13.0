import React, { useState } from 'react';
import { SvgIcon } from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import toast, { Toaster } from 'react-hot-toast';

const SendMessage = ({ id, toast, refetch,sendcek , typing, sendMsg ,setMsg, msg}) => {

  const sendMessage = async () => {
    if (msg.trim() !== '') {
      try {
        toast("sending message...")
        const response = await fetch('/api/CRUD/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ msg, receiverId: id }),
        });

        if (response.ok) {
          const newMessage = await response.json();
          // await refetch()
           await sendMsg(newMessage) 

          // sendcek(newMessage);
          setMsg('');
        } else {
          console.error('Failed to send message');
          toast.error("Message not sent") 

        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleChange = (e) => {
      setMsg(e.target.value);
      typing()
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className=' rounded-md w-full'>
      <Toaster/>
    

      <form className=' p-2 flex ' onSubmit={handleSubmit}>
        <input type="text"  className=' px-2 bottom-1 bg-green-300 rounded-md  w-full' value={msg} onChange={handleChange} />
        <button type="submit">
          
          <SendTwoToneIcon className=' text-blue-500'/>
        
        </button>
        
      </form>
    </div>
  );
};

export default SendMessage;
