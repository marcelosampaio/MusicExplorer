import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Favorite, FavoriteBorder, PlayArrow } from "@mui/icons-material";

function MusicCard({ music, isFavorite, onToggleFavorite, onPlayPreview }) {
  return (
    <Card sx={{ position: "relative", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={music.cover}
          alt={music.title}
          sx={{
            width: "100%",
            height: { xs: 140, sm: 180, md: 200 }, // altura responsiva
            objectFit: "cover",
          }}
        />

        {/* Botão de play */}
        <IconButton
          onClick={() => onPlayPreview(music.preview)}
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            p: 0.5,
          }}
        >
          <PlayArrow />
        </IconButton>

        {/* Botão de favorito */}
        <IconButton
          onClick={() => onToggleFavorite(music.id)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            color: isFavorite ? "#1db954" : "#fff",
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography variant="subtitle1" noWrap sx={{ fontSize: { xs: 14, sm: 15, md: 16 } }}>
          {music.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          noWrap
          sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }}
        >
          {music.artist}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MusicCard;
