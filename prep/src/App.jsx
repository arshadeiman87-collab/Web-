import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/public/Home";
import Hotels from "./pages/public/Hotels";
import HotelDetails from "./pages/public/HotelDetails";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import OwnerOverview from "./pages/owner/Overview";
import MyHotel from "./pages/owner/MyHotel";
import Rooms from "./pages/owner/Rooms";
import OwnerBookings from "./pages/owner/Bookings";
import OwnerReviews from "./pages/owner/Reviews";
import OwnerRevenue from "./pages/owner/Revenue";
import Cleaning from "./pages/owner/Cleaning";
import Settings from "./pages/owner/Settings";

import AdminOverview from "./pages/admin/Overview";
import PendingRequests from "./pages/admin/PendingRequests";
import ApprovedHotels from "./pages/admin/ApprovedHotels";
import Owners from "./pages/admin/Owners";
import AdminBookings from "./pages/admin/Bookings";
import AdminRevenue from "./pages/admin/Revenue";
import AdminSettings from "./pages/admin/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-hotel" element={<Register />} />
      </Route>

      <Route path="/owner" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/owner/overview" replace />} />
        <Route path="overview" element={<OwnerOverview />} />
        <Route path="hotel" element={<MyHotel />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="bookings" element={<OwnerBookings />} />
        <Route path="reviews" element={<OwnerReviews />} />
        <Route path="revenue" element={<OwnerRevenue />} />
        <Route path="cleaning" element={<Cleaning />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/overview" replace />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="pending" element={<PendingRequests />} />
        <Route path="approved" element={<ApprovedHotels />} />
        <Route path="owners" element={<Owners />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="revenue" element={<AdminRevenue />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}