import { Box, CircularProgress } from "@mui/material";

export default function Spinner({ size = 40, mt = 6 }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt }}>
      <CircularProgress sx={{ color: "#1DB954" }} size={size} />
    </Box>
  );
}
