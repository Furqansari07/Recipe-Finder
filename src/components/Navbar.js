import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const getUserFromLocalStorage = () => {
    try{
      const item = localStorage.getItem('user');
      return item ? JSON.parse(item) : null;
    }
    catch(error){
      console.error('Failed to parse user from localStorage:',error);
      return null;
    }
  };
  const user = getUserFromLocalStorage();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Recipe Finder</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>

          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/history">History</Link>
              </li>

              {/* Show 'Add Recipe' only for non-admin users */}
              {!user.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
                </li>
              )}

              <li className="nav-item">
                <button className="nav-link btn btn-link text-danger" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}

          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login/Register</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


