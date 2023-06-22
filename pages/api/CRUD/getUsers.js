import prisma from  '../../../utils/prisma';
import { authOptions } from '../../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(404).json({ error: 'Unauthorized' });
      return;
    }
    
    const PrismaUser = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });
    
    try {
      const data = await prisma.user.findMany({
        where: {
          id: { not: PrismaUser.id }
        }
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occurred while making a post" });
    }
  }
}
