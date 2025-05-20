import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";
import GenerateTrip from "../pages/GenerateTrip";
import TripResult from "../pages/TripResult";
import PhotoDetection from "../pages/PhotoDetection";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const Routers = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tours/search" element={<SearchResultList />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/generate-trip" element={<GenerateTrip />} />
          <Route path="/trip/:id" element={<TripResult />} />
          <Route path="/photo-detection" element={<PhotoDetection />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
