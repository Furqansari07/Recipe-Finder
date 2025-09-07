import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function RecipeDetails() {
  const { name } = useParams(); // Get recipe name from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === 'admin'; // You can set 'admin' role manually for now

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost/recipe_finder_backend/api/get_recipe.php?name=${encodeURIComponent(name)}`
        );
        const data = await response.json();

        if (data.success && data.recipe) {
          setRecipe(data.recipe);
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [name]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost/recipe_finder_backend/api/delete_recipe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Recipe deleted successfully!');
        navigate('/');
      } else {
        alert('❌ Failed to delete recipe.');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('❌ Something went wrong.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        {loading ? (
          <p className="text-center">Loading recipe...</p>
        ) : recipe ? (
          <>
            <h2 className="mb-4 text-center">{recipe.name}</h2>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="img-fluid rounded shadow mb-4"
              style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
            />

            <h4>🧂 Ingredients</h4>
            <ul>
              {recipe.ingredients?.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>

            <h4 className="mt-4">📋 Instructions</h4>
            <p>{recipe.instruction}</p>

            {/* Admin Buttons */}
            {isAdmin && (
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/edit/${name}`)}
                >
                  ✏️ Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  🗑️ Delete
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-danger">Recipe not found!</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default RecipeDetails;
