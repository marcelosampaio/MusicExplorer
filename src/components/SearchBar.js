import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 2,
        mb: 2,
        px: 2,
        flexWrap: "wrap",
      }}
    >
      <TextField
        inputRef={inputRef} // adiciona referência para foco
        variant="outlined"
        placeholder="Buscar músicas, álbuns, artistas..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        sx={{
          flexGrow: 1,
          minWidth: { xs: "180px", sm: "300px" },
          bgcolor: "background.paper",
          borderRadius: 1,
          input: { fontSize: { xs: 16, sm: 18 } },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#1DB954",
              borderWidth: 2,
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#1db954",
          color: "#fff",
          fontSize: { xs: 14, sm: 16 },
          px: 3,
          py: 1.2,
          "&:hover": { bgcolor: "#17a348" },
          mt: { xs: 0, sm: 0 },
        }}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
