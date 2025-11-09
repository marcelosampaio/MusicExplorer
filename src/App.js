import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { AuthProvider } from "./contexts/AuthProvider";
import { AudioPlayerProvider } from "./contexts/AudioPlayerProvider";

import Header from "./components/Header";
import MiniPlayer from "./components/MiniPlayer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <AudioPlayerProvider>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* 🎧 Mini Player Global */}
        <MiniPlayer />
      </AudioPlayerProvider>
    </AuthProvider>
  );
}

export default App;
