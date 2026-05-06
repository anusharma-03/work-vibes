import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminProtectedRoute = () => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const adminToken = localStorage.getItem('adminToken');

  if (!isAdminLoggedIn || !adminToken) {
    // If not logged in, redirect to login page
    return <Navigate to="/status/admin/login" replace />;
  }

  // If logged in, render the child routes
  return <Outlet />;
};
