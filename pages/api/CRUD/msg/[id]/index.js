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
    
    
    const  receiverId  =  req.query.id;
    const sessionUserId =  PrismaUser.id; // Assuming you have session middleware that sets the session user ID
    
    // try {

            let messages = await fetch(`${process.env.URL}/api/messages`,{
                headers: {
          "Content-Type": "application/json",
        },
            method:"POST",
            body:JSON.stringify({
                receiverId,
                sessionUserId
            })
        })
        
    //  messages = await messages.json()
    // } catch (error) {
        //   res.status(500).json({ error: 'Failed to fetch chat conversation', message: error.message });
        // }
     res.json(messages);
      }
     
      
      


    }