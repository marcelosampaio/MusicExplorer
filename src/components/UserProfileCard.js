import React from "react";
import { Paper, Typography, Box } from "@mui/material";

function UserProfileCard({ email }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 400,
          width: "90%",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Perfil do Usuário
        </Typography>

        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>
          Email:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: "medium" }}>
          {email}
        </Typography>
      </Paper>
    </Box>
  );
}

export default UserProfileCard;
