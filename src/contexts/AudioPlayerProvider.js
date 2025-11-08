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

    audio.play()
      .then(() => {
        setCurrentTrack(track);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Erro ao reproduzir áudio:", err);
        setIsPlaying(false);
      });

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      audioRef.current = null;
    };
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = (urlOrTrack) => {
    // suporta tanto url quanto objeto completo
    const url = typeof urlOrTrack === "string" ? urlOrTrack : urlOrTrack?.preview;

    if (!url) return;

    if (isPlaying && currentTrack?.preview === url) {
      pauseAudio();
    } else {
      const track =
        typeof urlOrTrack === "object"
          ? urlOrTrack
          : { preview: url, title: "Desconhecida" };
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
        pauseAudio,
        toggleAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
