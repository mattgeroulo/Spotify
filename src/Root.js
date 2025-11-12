import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import LoginLandingPage from "./LoginLandingPage";
import MyProfile from "./MyProfile";
export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginLandingPage />} />
      <Route path="/profile" element={<MyProfile />} />
    </Routes>
  );
}
