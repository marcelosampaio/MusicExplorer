import React from "react";
import { Grid } from "@mui/material";
import MusicCard from "./MusicCard";

function MusicList({ musics, favorites, onToggleFavorite, onPlayPreview }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 3 }}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        justifyContent: "center",
      }}
    >
      {musics.map((music) => (
        <Grid
          item
          key={music.id}
          xs={12}
          sm={6}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
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
