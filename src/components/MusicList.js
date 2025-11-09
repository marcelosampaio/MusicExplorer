import React from "react";
import { Grid } from "@mui/material";
import MusicCard from "./MusicCard";

function MusicList({
  musics,
  favorites,
  loadingFavorites = [],
  onToggleFavorite,
  onPlayPreview,
  isPlaying,
  currentTrackUrl,
}) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {musics.map((music) => {
        const isTrackPlaying = isPlaying && currentTrackUrl === music.preview;

        return (
          <Grid item key={music.id}>
            <MusicCard
              music={music}
              isFavorite={favorites.includes(music.id)}
              isLoading={loadingFavorites.includes(music.id)}
              onToggleFavorite={onToggleFavorite}
              onPlayPreview={onPlayPreview}
              isTrackPlaying={isTrackPlaying}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MusicList;
