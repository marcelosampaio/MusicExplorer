import React from "react";
import { Grid } from "@mui/material";
import MusicCard from "./MusicCard";

function MusicList({
  musics,
  favorites,
  loadingFavorites = [],
  onToggleFavorite,
  onPlayPreview,
}) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {musics.map((music) => (
        <Grid item key={music.id}>
          <MusicCard
            music={music}
            isFavorite={favorites.includes(music.id)}
            isLoading={loadingFavorites.includes(music.id)}
            onToggleFavorite={onToggleFavorite}
            onPlayPreview={onPlayPreview}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MusicList;
