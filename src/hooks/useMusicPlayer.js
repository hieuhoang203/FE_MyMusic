import { useState, useCallback, useRef, useEffect } from 'react';
import { DEFAULT_SONGS } from '../constants';

const useMusicPlayer = (initialSongs = DEFAULT_SONGS) => {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const currentSong = songs[currentSongIndex] || null;

  // Format time helper
  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });

      audioRef.current.addEventListener('ended', () => {
        nextSong();
      });

      audioRef.current.addEventListener('error', (e) => {
        setError('Error loading audio file');
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('loadstart', () => {
        setIsLoading(true);
      });

      audioRef.current.addEventListener('canplay', () => {
        setIsLoading(false);
        setError(null);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('loadstart', () => {});
        audioRef.current.removeEventListener('canplay', () => {});
      }
    };
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Play/Pause functionality
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
        })
        .catch((err) => {
          setError('Error playing audio');
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentSong]);

  // Play specific song
  const playSong = useCallback((songIndex) => {
    if (songIndex < 0 || songIndex >= songs.length) return;

    setCurrentSongIndex(songIndex);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          setError('Error playing audio');
          setIsPlaying(false);
        });
      }
    }
  }, [songs.length, isPlaying]);

  // Next song
  const nextSong = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }, [currentSongIndex, songs.length, playSong]);

  // Previous song
  const previousSong = useCallback(() => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    playSong(prevIndex);
  }, [currentSongIndex, songs.length, playSong]);

  // Seek to specific time
  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Set volume
  const setVolumeLevel = useCallback((newVolume) => {
    const volumeValue = Math.max(0, Math.min(1, newVolume));
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  }, []);

  // Update songs list
  const updateSongs = useCallback((newSongs) => {
    setSongs(newSongs);
    if (currentSongIndex >= newSongs.length) {
      setCurrentSongIndex(0);
    }
  }, [currentSongIndex]);

  return {
    // State
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    
    // Refs
    audioRef,
    
    // Actions
    togglePlayPause,
    playSong,
    nextSong,
    previousSong,
    seekTo,
    setVolumeLevel,
    updateSongs,
    
    // Helpers
    formatTime,
  };
};

export default useMusicPlayer;
