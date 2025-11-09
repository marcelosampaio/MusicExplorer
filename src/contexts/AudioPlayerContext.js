import { createContext, useContext } from "react";

export const AudioPlayerContext = createContext();

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayerContext deve ser usado dentro de um AudioPlayerProvider");
  }
  return context;
};
