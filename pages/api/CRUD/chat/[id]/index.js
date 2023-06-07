import prisma from '../../../../../utils/prisma';
import { authOptions } from '../../../auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  if(req.method === "GET"){

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
    
    
    const  receiverId  = await req.query.id;
    const sessionUserId = await PrismaUser.id; // Assuming you have session middleware that sets the session user ID
    
    // try {
      const messages = await prisma.message.findMany({
        where: {
          AND: [
            
            { OR: [{ senderId: sessionUserId }, { receiverId: sessionUserId }  ] },
            { OR: [ { receiverId: receiverId } ,{ senderId:  receiverId } ] },
          ],
        },
        orderBy: {
          timestamp: 'asc',
        },
        include:{
          sender: true,
        }
       
      });
  
      res.status(200).json(messages);
      // } catch (error) {
        //   res.status(500).json({ error: 'Failed to fetch chat conversation', message: error.message });
        // }
      }
     
      
      if (req.method === "DELETE"){

        const message = await prisma.message.delete({
          where: {
            id: req.query.id,
            sender: { connect: { id: PrismaUser.id } },
      
          },
        });
    
        res.status(200).json({ message: 'Message deleted successfully' });


      }


    }