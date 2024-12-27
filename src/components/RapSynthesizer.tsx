'use client';

import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, Mic, Save, Download } from 'lucide-react';

type Track = {
  id: string;
  name: string;
  url: string;
};

export default function RapSynthesizer() {
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    try {
      // API call will be implemented with Copilot
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Example track addition
      setTracks(prev => [...prev, {
        id: Date.now().toString(),
        name: 'New Track',
        url: audioFile || '',
      }]);
    } catch (error) {
      console.error('Synthesis failed:', error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto space-y-6">
      {/* Upload Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Upload Beat</h3>
        <button className="upload-zone w-full">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="audio-upload"
          />
          <label htmlFor="audio-upload" className="flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>Choose Audio File</span>
          </label>
        </button>
      </div>

      {/* Audio Player */}
      {audioFile && (
        <div className="audio-player flex items-center gap-3">
          <button 
            onClick={togglePlayPause}
            className="rounded-full bg-primary text-white p-3 hover:scale-105"
          >
            {isPlaying ? 
              <Pause className="w-5 h-5" /> : 
              <Play className="w-5 h-5" />
            }
          </button>
          <audio ref={audioRef} src={audioFile} className="hidden" />
          <div className="h-2 flex-1 bg-secondary/20 rounded-full">
            <div className="h-full w-1/3 bg-secondary rounded-full"/>
          </div>
        </div>
      )}

      {/* Lyrics Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Your Lyrics</h3>
        <textarea 
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Type or paste your lyrics here..."
          className="min-h-[120px]"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleSynthesize}
          disabled={!audioFile || !lyrics || isSynthesizing}
          className="btn bg-primary text-white flex items-center justify-center gap-2"
        >
          <Mic className="w-5 h-5" />
          <span>{isSynthesizing ? 'Processing...' : 'Synthesize'}</span>
        </button>
        <button 
          onClick={() => {}} // Will implement with Copilot
          className="btn bg-secondary text-white flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>Save</span>
        </button>
      </div>

      {/* Tracks List */}
      {tracks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Your Tracks</h3>
          <div className="space-y-2">
            {tracks.map(track => (
              <div key={track.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                <span>{track.name}</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-full">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-full">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
