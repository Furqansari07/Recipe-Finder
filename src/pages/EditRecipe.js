import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function EditRecipe() {
  const { name } = useParams(); // Get recipe name from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instruction: '',
    image: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing recipe details
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost/recipe_finder_backend/api/get_recipe.php?name=${encodeURIComponent(name)}`);
        const data = await res.json();
        if (data.success && data.recipe) {
          setRecipe(data.recipe);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [name]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/recipe_finder_backend/api/edit_recipe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ Recipe updated successfully!');
        navigate('/');
      } else {
        alert('❌ Failed to update recipe.');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('❌ Something went wrong!');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">✏️ Edit Recipe - {name}</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="col-md-8 mx-auto">
            <div className="mb-3">
              <label className="form-label">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={recipe.name}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={recipe.image}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients (comma separated)</label>
              <textarea
                className="form-control"
                name="ingredients"
                rows="4"
                value={recipe.ingredients}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Instructions</label>
              <textarea
                className="form-control"
                name="instruction"
                rows="5"
                value={recipe.instruction}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success w-100">Update Recipe</button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EditRecipe;
