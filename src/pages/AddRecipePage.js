import React, { useState } from 'react';
import Footer from '../components/Footer';

function AddRecipePage() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    ingredients: '',
    instruction: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost/recipe_finder_backend/api/add_recipe.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      setFormData({ name: '', image: '', ingredients: '', instruction: '' });
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">➕ Add New Recipe</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Paneer Butter Masala"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL (or path)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/image/paneer.png or full image URL"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <textarea
            className="form-control"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instruction</label>
          <textarea
            className="form-control"
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Recipe</button>
      </form>

      <Footer />
    </div>
  );
}

export default AddRecipePage;
