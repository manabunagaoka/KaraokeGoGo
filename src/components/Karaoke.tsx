'use client';

import React, { useRef, useState, useEffect, FC } from 'react';
import { 
  Upload, 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  MoreVertical, 
  Settings, 
  Share2, 
  Info 
} from 'lucide-react';

export interface KaraokeProps {
  userId: string;
}

export const Karaoke: FC<KaraokeProps> = ({ userId }) => {
  // State declarations
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioFile, setAudioFile] = useState<string>('');
  const [audioFileName, setAudioFileName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Time formatting helper function
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">

        {/* Upload and Player Section */}
        <div className="bg-dark-800 rounded-lg p-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-dark-600 rounded-lg hover:border-accent transition-colors p-4">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setAudioFile(url);
                  setAudioFileName(file.name);
                }
              }}
              className="hidden"
              id="audio-upload"
            />
            <label 
              htmlFor="audio-upload" 
              className="flex flex-col items-center justify-center h-20 cursor-pointer"
            >
              <Upload className="w-6 h-6 mb-2 text-accent" />
              <span className="text-sm text-gray-300">
                {audioFileName || "Drop your beat here or click to browse"}
              </span>
            </label>
          </div>

          {/* Audio Controls */}
          <div className="bg-dark-700 rounded-lg p-4 mt-3">
            <audio
              ref={audioRef}
              src={audioFile || ''}
              onTimeUpdate={() => {
                if (audioRef.current) {
                  setCurrentTime(audioRef.current.currentTime);
                }
              }}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setDuration(audioRef.current.duration);
                }
              }}
              className="hidden"
            />
            {/* Progress Bar */}
            <div 
              className="h-2 bg-dark-600 rounded-full mb-4 cursor-pointer"
              onClick={(e) => {
                if (audioRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = percent * duration;
                }
              }}
            >
              <div 
                className="h-full bg-accent rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime -= 10;
                  }
                }}
                className="p-2 hover:text-accent text-gray-300"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button 
                onClick={() => {
                  if (isRecording) {
                    setIsRecording(false);
                    // Recording stop logic will go here
                  } else if (audioFile) {
                    if (isPlaying) {
                      audioRef.current?.pause();
                    } else {
                      audioRef.current?.play();
                    }
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="w-12 h-12 rounded-full bg-accent flex items-center justify-center"
              >
                {isRecording ? (
                  <Mic className="w-6 h-6 text-white" />
                ) : (
                  isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )
                )}
              </button>

              <button 
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime += 10;
                  }
                }}
                className="p-2 hover:text-accent text-gray-300"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 mt-4 justify-center">
              <Volume2 className="w-5 h-5 text-gray-300" />
              <div className="w-24 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (audioRef.current) {
                      audioRef.current.volume = newVolume;
                    }
                  }}
                  className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF4081 0%, #FF4081 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ranking Chart Section */}
        <div className="bg-dark-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Ranking Chart</h2>
          <div className="space-y-4">
            {/* Example ranking entries */}
            <div className="flex items-center justify-between p-3 bg-dark-700 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">1</span>
                <div>
                  <h3 className="font-medium">Track Name</h3>
                  <p className="text-sm text-gray-400">Artist Name</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-accent">98</span>
                <span className="text-gray-400 text-sm ml-1">points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};