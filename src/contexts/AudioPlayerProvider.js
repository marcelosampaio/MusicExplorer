import React, { useContext } from "react";
import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioPlayerContext from "./AudioPlayerContext";

export function AudioPlayerProvider({ children }) {
  const audio = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={audio}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayerContext deve ser usado dentro de um AudioPlayerProvider"
    );
  }
  return context;
}
