import { useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error(
      "useAudioPlayerContext deve ser usado dentro de um <AudioPlayerProvider>"
    );
  }

  return context;
}
