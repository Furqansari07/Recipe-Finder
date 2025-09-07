import React from 'react';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">About Recipe Finder</h2>
        <p className="lead text-center mb-4">Your personal assistant for discovering, saving, and managing recipes!</p>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">🔍 <strong>Search Recipes:</strong> Easily search recipes by name and view complete details.</li>
              <li className="list-group-item">📋 <strong>Popular Recipes:</strong> View trending and famous recipes on the home page.</li>
              <li className="list-group-item">🧠 <strong>Search History:</strong> Your recent searches are saved for quick access.</li>
              <li className="list-group-item">🧾 <strong>Recipe Details:</strong> View ingredients, instructions, and image for each recipe.</li>
              <li className="list-group-item">➕ <strong>Add New Recipes:</strong> Share your own recipes using the Add Recipe form.</li>
              
              <li className="list-group-item">🔐 <strong>User Authentication:</strong> Secure registration and login functionality.</li>
              
              <li className="list-group-item">📸 <strong>Image Upload:</strong> Upload recipe images from your local system.</li>
              <li className="list-group-item">🌙 <strong>Modern UI:</strong> Responsive design with attractive layout and navigation.</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;