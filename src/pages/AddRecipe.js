import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function AddRecipe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !ingredients || !instruction || !image || !description) {
      alert("Please fill in all fields including image.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description",description);
    formData.append("ingredients", ingredients);
    formData.append("instruction", instruction);
    formData.append("image", image);
    formData.append("user_id", user.id || '');


    try {
      const response = await fetch("http://localhost/recipe_finder_backend/api/add_recipe.php", {
        method: "POST",
        body: formData,
      });
      //edit
      const text = await response.text();
      console.log("Raw response:", text);
      const data = JSON.parse(text);
      //const data = await response.json();
      //console.log('Recipe Submission Response:', data);

      if (data.success) {
        alert("✅ Recipe added successfully!");
        // Redirect to Home
        navigate('/');
      } else {
        alert("❌ Failed to add recipe: " + data.message);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="mb-4 text-center">Add a New Recipe</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Recipe Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paneer Butter Masala"
            />
          </div>
          {/*description*/}
            
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              placeholder="Enter a short description."
            ></textarea>
          </div>



          {/* Ingredients */}
          <div className="mb-3">
            <label className="form-label">Ingredients (comma-separated)</label>
            <textarea
              className="form-control"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="3"
              placeholder="e.g. Paneer, Butter, Tomato, Spices"
            ></textarea>
          </div>

          {/* Instruction */}
          <div className="mb-3">
            <label className="form-label">Instruction</label>
            <textarea
              className="form-control"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows="4"
              placeholder="Step-by-step instructions..."
            ></textarea>
          </div>

          {/* Image File Upload */}
          <div className="mb-4">
            <label className="form-label">Upload Recipe Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Add Recipe</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddRecipe;