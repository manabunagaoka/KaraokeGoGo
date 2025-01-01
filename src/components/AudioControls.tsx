'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'

interface AudioControlsProps {
  audioUrl?: string;
}

export default function AudioControls({ audioUrl }: AudioControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <div className="card p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button className="btn btn-secondary p-2 rounded-full">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={togglePlay}
          className="btn btn-primary p-3 rounded-full"
        >
          {isPlaying ? 
            <Pause className="w-6 h-6" /> : 
            <Play className="w-6 h-6" />
          }
        </button>
        <button className="btn btn-secondary p-2 rounded-full">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 mt-4">
        <button
          onClick={() => {
            setIsMuted(!isMuted)
            if (audioRef.current) {
              audioRef.current.muted = !isMuted
            }
          }}
          className="p-1 hover:bg-dark-600 rounded"
        >
          {isMuted ? 
            <VolumeX className="w-5 h-5" /> : 
            <Volume2 className="w-5 h-5" />
          }
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}