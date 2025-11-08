import React from "react";
import { Box, Typography, IconButton, Avatar, Slide } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { useAudioPlayerContext } from "../contexts/AudioPlayerProvider";

function MiniPlayer() {
  const { isPlaying, currentTrack, toggleAudio } = useAudioPlayerContext();

  if (!currentTrack) return null; // não renderiza nada se não há faixa atual

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          zIndex: 1200,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={currentTrack.cover}
            alt={currentTrack.title}
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                fontSize: { xs: 14, sm: 16 },
              }}
              noWrap
            >
              {currentTrack.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: 12, sm: 14 },
              }}
              noWrap
            >
              {currentTrack.artist}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => toggleAudio(currentTrack.preview)}
          sx={{
            bgcolor: "#1DB954",
            color: "#fff",
            "&:hover": { bgcolor: "#1ed760" },
            width: 50,
            height: 50,
          }}
        >
          {isPlaying ? <Stop sx={{ fontSize: 30 }} /> : <PlayArrow sx={{ fontSize: 30 }} />}
        </IconButton>
      </Box>
    </Slide>
  );
}

export default MiniPlayer;
