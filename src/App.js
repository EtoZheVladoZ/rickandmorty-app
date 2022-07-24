import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import Header from "./components/Header";
import Home from "./pages";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Header />

      <Container maxWidth="lg">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile/:characterId" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
