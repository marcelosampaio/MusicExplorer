import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Slide,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Stop } from "@mui/icons-material";
import { useAudioPlayerContext } from "../contexts/AudioPlayerContext";

function MiniPlayer() {
  const { currentTrack, isPlaying, stopAudio } = useAudioPlayerContext();
  const visible = isPlaying && currentTrack;

  if (!visible) return null;

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Card
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          bgcolor: "#121212",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          boxShadow: "0 -2px 12px rgba(0,0,0,0.6)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.4s ease-in-out",
        }}
      >
        {/* Capa */}
        <CardMedia
          component="img"
          image={currentTrack?.cover || ""}
          alt={currentTrack?.title || "Faixa"}
          sx={{
            width: 56,
            height: 56,
            borderRadius: 1,
            objectFit: "cover",
            mr: 2,
          }}
        />

        {/* Título e artista */}
        <CardContent
          sx={{
            flexGrow: 1,
            py: 0,
            "&:last-child": { pb: 0 },
            overflow: "hidden",
          }}
        >
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ fontWeight: 500, fontSize: 15 }}
          >
            {currentTrack?.title || "Reproduzindo..."}
          </Typography>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}
          >
            {currentTrack?.artist || ""}
          </Typography>
        </CardContent>

        {/* Botão Stop */}
        <IconButton
          onClick={stopAudio}
          sx={{
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            width: 42,
            height: 42,
          }}
        >
          <Stop />
        </IconButton>
      </Card>
    </Slide>
  );
}

export default MiniPlayer;
