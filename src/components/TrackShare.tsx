'use client'

import { Share2, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface TrackShareProps {
  trackId: string;
  initialLikes?: number;
  initialComments?: number;
}

export default function TrackShare({ 
  trackId, 
  initialLikes = 0, 
  initialComments = 0 
}: TrackShareProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my track!',
          text: 'Listen to my new rap track',
          url: `https://yourapp.com/track/${trackId}`,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      setShowShareMenu(true)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => {
          setIsLiked(!isLiked)
          setLikes(isLiked ? likes - 1 : likes + 1)
        }}
        className={`btn btn-secondary flex items-center space-x-1 ${
          isLiked ? 'text-accent' : ''
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        <span>{likes}</span>
      </button>

      <button className="btn btn-secondary flex items-center space-x-1">
        <MessageCircle className="w-5 h-5" />
        <span>{initialComments}</span>
      </button>

      <button 
        onClick={handleShare}
        className="btn btn-secondary flex items-center space-x-1"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {showShareMenu && (
        <div className="absolute bottom-full mb-2 bg-dark-700 rounded-lg shadow-lg p-2">
          <div className="flex flex-col space-y-2">
            <button className="btn btn-secondary w-full">Copy Link</button>
            <button className="btn btn-secondary w-full">Share to Twitter</button>
            <button className="btn btn-secondary w-full">Share to Instagram</button>
          </div>
        </div>
      )}
    </div>
  )
}