import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const storedUser = localStorage.getItem("user");
  let user = null;
  try{
    if(storedUser){
      user = JSON.parse(storedUser);
    }

  }
  catch(e){
    console.error("Failed to parse user from localStorage:", e);  


  }
  return user ? children : <Navigate to="/login" />;
  }
export default ProtectedRoute;