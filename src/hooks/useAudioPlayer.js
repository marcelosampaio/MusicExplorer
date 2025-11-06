import { useState, useRef } from "react";

export function useAudioPlayer() {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {};
  const stop = () => {};
  const toggle = () => {};

  return {
    play,
    stop,
    toggle,
    currentTrack,
    isPlaying,
  };
}
