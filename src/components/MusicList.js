import React from "react";
import { Grid } from "@mui/material";
import MusicCard from "./MusicCard";

function MusicList({ musics, favorites, onToggleFavorite, onPlayPreview }) {
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {musics.map((music) => (
        <Grid
          item
          key={music.id}
          xs={12}      // mobile: 1 coluna
          sm={6}       // tablet: 2 colunas
          md={3}       // desktop: 4 colunas
        >
          <MusicCard
            music={music}
            isFavorite={favorites.includes(music.id)}
            onToggleFavorite={onToggleFavorite}
            onPlayPreview={onPlayPreview}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MusicList;
