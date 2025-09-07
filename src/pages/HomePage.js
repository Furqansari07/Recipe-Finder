import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import { saveRecipeHistory } from '../api/history';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [finalQuery, setFinalQuery] = useState(''); // ✅ New state for confirmed search

  const location = useLocation();

  // ✅ Fetch all recipes once
  const fetchAllRecipes = async () => {
    try {
      const response = await fetch('http://localhost/recipe_finder_backend/api/get_all_recipes.php');
      const data = await response.json();
      if (data.success) {
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // ✅ Fetch all on initial load
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // ✅ Reload all recipes when route is "/"
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchQuery('');
      setFinalQuery('');
      fetchAllRecipes();
    }
  }, [location.pathname]);

  // ✅ Filter recipes only when user confirms search
  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(finalQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [finalQuery, recipes]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="mb-4 text-center">🍲 Welcome to Recipe Finder!</h2>

        {/* Search Bar */}
        <div className="mb-4 input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="input-group-text bg-primary text-white"
            onClick={() => {
              setFinalQuery(searchQuery);
              const user = JSON.parse(localStorage.getItem('user'));
              if (user && searchQuery.trim() !== '') {
                saveRecipeHistory(user.id, searchQuery); // ✅ Save only when button is clicked
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Recipes */}
        <div className="row">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      recipe.image && recipe.image.startsWith("uploads/")
                        ? `http://localhost/recipe_finder_backend/${recipe.image}`
                        : recipe.image || ''
                    }
                    className="card-img-top"
                    alt={recipe.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">
                      {recipe.description || 'No description available.'}
                    </p>
                    <Link to={`/recipe/${recipe.name}`} className="btn btn-primary mt-auto">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No recipes found for "{finalQuery}"</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;