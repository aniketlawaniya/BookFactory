import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from "../store/data/AuthContext"
import { Navigate } from 'react-router-dom';
const AuthRoute = () => {
  const { token }= useAuth();
  return (
    token?<Navigate to="/"/>:<Outlet/>
  )
}

export {AuthRoute}