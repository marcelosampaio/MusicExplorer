import { createContext, useContext } from "react";

export const AudioPlayerContext = createContext(null);

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayerContext deve ser usado dentro de AudioPlayerProvider");
  }
  return context;
}
