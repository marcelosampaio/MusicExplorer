import { Box, Typography } from "@mui/material";

export default function UserInfo({ user }) {
  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
        width: "60%",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
      >
        Informações do Perfil
      </Typography>

      {user ? (
        <>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography color="text.secondary">
            <strong>Data de criação:</strong>{" "}
            {new Date(user.created_at).toLocaleDateString("pt-BR")}
          </Typography>
        </>
      ) : (
        <Typography color="text.secondary">
          Faça login para visualizar seus dados.
        </Typography>
      )}
    </Box>
  );
}
