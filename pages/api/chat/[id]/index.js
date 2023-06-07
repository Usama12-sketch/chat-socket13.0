import prisma from '../../../../utils/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async (req, res) => {

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(404).json({ error: 'Unauthorized' })
      return
    }
    const PrismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email },
    })
    if (!PrismaUser) {
      res.status(404).json({ error: 'Unauthorized' })
      return
    }
    console.log(PrismaUser.id)
    

    if (req.method === "POST") {
      // get message
      const messageId = req.query.id;
  
      // dispatch to channel "message"
      const message = await prisma.message.delete({
        where: {
          id: req.query.id,
        
    
        },
      });
  

      res?.socket?.server?.io?.emit("deleteMsg", messageId);
  
      // return message
      res.status(201).json(messageId);
    }
  };