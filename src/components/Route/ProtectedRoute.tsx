import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🎯 GỌI THƯ VIỆN RA

export default function ProtectedRoute() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    // eslint-disable-next-line react-hooks/purity
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;
    if (isTokenExpired) {
      localStorage.removeItem('token');
      return <Navigate to='/login' replace />;
    }
  } catch {
    localStorage.removeItem('token');
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
}
