import React, { useState, useRef, useEffect } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";

export function AudioPlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  const playAudio = (track) => {
    if (!track?.preview) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.preview);
    audioRef.current = audio;

    audio
      .play()
      .then(() => {
        setCurrentTrack(track);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Erro ao reproduzir áudio:", err);
        setIsPlaying(false);
      });

    audio.onended = () => {
      stopAudio();
    };
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const toggleAudio = (track) => {
    if (!track?.preview) return;

    if (isPlaying && currentTrack?.preview === track.preview) {
      stopAudio();
    } else {
      playAudio(track);
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

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        playAudio,
        stopAudio,
        toggleAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
