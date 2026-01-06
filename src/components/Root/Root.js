import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App/App";
import Login from "../Login/Login";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";
import MyProfile from "../MyProfile/MyProfile";
export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginLandingPage />} />
      <Route path="/profile" element={<MyProfile />} />
    </Routes>
  );
}
