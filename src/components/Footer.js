import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Column 1: About */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">About Recipe Finder</h5>
            <p>
              Find thousands of delicious recipes at your fingertips. Whether you’re craving traditional or modern dishes — we’ve got it all!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">🏠 Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">📖 About Us</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">📞 Contact</Link></li>
              <li><Link to="/login" className="text-light text-decoration-none">🔐 Login/Register</Link></li>
              <li><Link to="/history" className="text-light text-decoration-none">📜 Recipe History</Link></li>

              <li><Link to="/add-recipe" className="text-light text-decoration-none">+ Add Recipe</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Contact</h5>
            <p>📧 support@recipefinder.com</p>
            <p>📞 ‪+91 79001 41523‬</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
              <a href="#" className="text-light" aria-label="Facebook"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#" className="text-light" aria-label="Twitter"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#" className="text-light" aria-label="Instagram"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-light" aria-label="YouTube"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>
        </div>

        <hr className="bg-light opacity-25" />

        <div className="text-center">
          <small>© 2025 Recipe Finder | Built with ❤ by Furqan</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
