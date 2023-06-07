import prisma from '../../../utils/prisma';

export default async (req, res) => {
    if (req.method === "POST") {
      // get message

      const msg = await req.body;
  const message = await prisma.message.findUnique({
    where:{
      id: msg.data.id
    },
    include:{
      sender:true
    }


  }) 
      // dispatch to channel "message"
      res?.socket?.server?.io?.emit("message", message);
  
      // return message
      res.status(201).json(message);
    }
  };