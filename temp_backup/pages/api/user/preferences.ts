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
      const preferences = await prisma.userPreferences.findUnique({
        where: { userId }
      })
      
      if (!preferences) {
        // Create default preferences if none exist
        const defaultPreferences = await prisma.userPreferences.create({
          data: {
            userId,
            theme: 'dark',
            defaultPitch: 0,
            defaultTempo: 100,
            audioQuality: 'high',
            emailNotifications: true,
            pushNotifications: true
          }
        })
        return res.status(200).json(defaultPreferences)
      }

      return res.status(200).json(preferences)
    } catch (error) {
      console.error('Error fetching user preferences:', error)
      return res.status(500).json({ error: 'Failed to fetch user preferences' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const {
        theme,
        defaultPitch,
        defaultTempo,
        audioQuality,
        emailNotifications,
        pushNotifications
      } = req.body

      const preferences = await prisma.userPreferences.upsert({
        where: { userId },
        update: {
          theme,
          defaultPitch,
          defaultTempo,
          audioQuality,
          emailNotifications,
          pushNotifications
        },
        create: {
          userId,
          theme,
          defaultPitch,
          defaultTempo,
          audioQuality,
          emailNotifications,
          pushNotifications
        }
      })

      return res.status(200).json(preferences)
    } catch (error) {
      console.error('Error updating user preferences:', error)
      return res.status(500).json({ error: 'Failed to update user preferences' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}