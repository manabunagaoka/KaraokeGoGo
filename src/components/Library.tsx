import { useState, useEffect } from 'react';
import { Play, Pause, Trash2, Heart, Share2, Download } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  createdAt: Date;
  transcribedLyrics?: string;
  isRecorded: boolean;
  likes: number;
}

const Library = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Format date to local string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle file upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload to a server here
    // For now, we'll use local URL
    const audioUrl = URL.createObjectURL(file);
    
    const newTrack: Track = {
      id: Date.now().toString(), // In real app, this would be from the server
      title: file.name,
      audioUrl,
      createdAt: new Date(),
      isRecorded: false,
      likes: 0
    };

    setTracks(prev => [...prev, newTrack]);
    // Save to localStorage
    localStorage.setItem('tracks', JSON.stringify([...tracks, newTrack]));
  };

  // Play/Pause handling
  const togglePlay = (trackId: string, audioUrl: string) => {
    if (currentlyPlaying === trackId) {
      audioElement?.pause();
      setCurrentlyPlaying(null);
    } else {
      audioElement?.pause();
      const newAudio = new Audio(audioUrl);
      newAudio.play();
      setAudioElement(newAudio);
      setCurrentlyPlaying(trackId);
    }
  };

  // Delete track
  const deleteTrack = (trackId: string) => {
    if (currentlyPlaying === trackId) {
      audioElement?.pause();
      setCurrentlyPlaying(null);
    }
    setTracks(prev => prev.filter(track => track.id !== trackId));
    localStorage.setItem('tracks', JSON.stringify(tracks.filter(track => track.id !== trackId)));
  };

  // Load tracks from localStorage on component mount
  useEffect(() => {
    const savedTracks = localStorage.getItem('tracks');
    if (savedTracks) {
      setTracks(JSON.parse(savedTracks).map((track: Track) => ({
        ...track,
        createdAt: new Date(track.createdAt)
      })));
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Track
          <input
            type="file"
            accept="audio/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-4">
        {tracks.map(track => (
          <div key={track.id} className="border rounded-lg p-4 flex items-center justify-between bg-white shadow">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => togglePlay(track.id, track.audioUrl)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {currentlyPlaying === track.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <div>
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(track.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:text-blue-500">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{track.likes}</span>
              </button>
              <button className="p-2 hover:text-blue-500">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-blue-500">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTrack(track.id)}
                className="p-2 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;