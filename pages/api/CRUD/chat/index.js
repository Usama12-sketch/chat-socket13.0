import prisma from '../../../../utils/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
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



    const { receiverId, msg } = req.body;
  
    // try {
      // const sender = await prisma.user.findUnique({ where: { id: PrismaUser.id  } });
      // const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
  
      // if (!sender || !receiver) {
      //   throw new Error('Sender or receiver not found');
      // }
  
      const message = await prisma.message.create({
        data: {
          content: msg,
          sender: { connect: { id: PrismaUser.id } },
          receiverId:  await receiverId ,
        },
      });
  
      res.status(200).json({ message: 'Message sent successfully', data: message });
    // } catch (error) {
    //   res.status(500).json({ error: 'Failed to send message', message: error.message });
    // }
  }
  