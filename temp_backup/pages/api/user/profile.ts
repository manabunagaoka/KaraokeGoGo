import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req)
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { preferences: true }
      })
      
      if (!user) {
        // Create a new user record if it doesn't exist
        const newUser = await prisma.user.create({
          data: {
            id: userId,
          },
          include: { preferences: true }
        })
        return res.status(200).json(newUser)
      }

      return res.status(200).json(user)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return res.status(500).json({ error: 'Failed to fetch user profile' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { bio } = req.body

      const updatedUser = await prisma.user.upsert({
        where: { id: userId },
        update: {
          bio,
        },
        create: {
          id: userId,
          bio,
        },
      })

      return res.status(200).json(updatedUser)
    } catch (error) {
      console.error('Error updating user profile:', error)
      return res.status(500).json({ error: 'Failed to update user profile' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}