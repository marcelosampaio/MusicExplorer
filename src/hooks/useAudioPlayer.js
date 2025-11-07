import { useState, useRef, useEffect } from "react";

export default function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
  const audioRef = useRef(null);

  const playAudio = (url) => {
    if (!url) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.play()
      .then(() => {
        setCurrentTrackUrl(url);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Erro ao reproduzir áudio:", err);
        setIsPlaying(false);
      });

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrackUrl(null);
      audioRef.current = null;
    };
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = (url) => {
    if (!url) return;

    if (isPlaying && currentTrackUrl === url) {
      pauseAudio();
    } else {
      playAudio(url);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    currentTrackUrl,
    playAudio,
    pauseAudio,
    toggleAudio,
  };
}
