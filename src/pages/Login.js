import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <LoginForm />
    </Box>
  );
}

export default Login;
