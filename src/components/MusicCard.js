import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder, PlayArrow, Stop } from "@mui/icons-material";

function MusicCard({
  music,
  isFavorite,
  isTrackPlaying,
  onToggleFavorite,
  onPlayPreview,
}) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
        boxSizing: "border-box",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={music.cover}
          alt={music.title}
          sx={{
            width: "100%",
            height: { xs: 180, sm: 200, md: 220 },
            objectFit: "cover",
          }}
        />

        {/* Botão de play/stop */}
        <IconButton
          onClick={() => onPlayPreview(music)}
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isTrackPlaying ? (
            <Stop sx={{ fontSize: 26 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 26 }} />
          )}
        </IconButton>

        {/* Botão de favorito */}
        <IconButton
          onClick={() => onToggleFavorite(music.id)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.6)",
            color: isFavorite ? "#1db954" : "#fff",
            "&:hover": {
              color: isFavorite ? "#1ed760" : "#ccc",
              bgcolor: "rgba(0,0,0,0.8)",
            },
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ fontSize: 24 }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            fontSize: { xs: 14, sm: 15, md: 16 },
            fontWeight: 500,
          }}
        >
          {music.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          noWrap
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
          }}
        >
          {music.artist}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MusicCard;
