import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { fetchRecipeHistory } from '../api/history';
import { useNavigate } from 'react-router-dom';

function RecipeHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const result = await fetchRecipeHistory(user.id);
        if (result.status === "success") {
          setHistory(result.data);
        } else {
          alert("Failed to load history: " + result.message);
        }
      }
    };
    getHistory();
  }, []);

  const handleRevisit = (recipeName) => {
    navigate(`/recipe/${encodeURIComponent(recipeName)}`);
    
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">🔍 Your Recipe Search History</h2>

        {history.length === 0 ? (
          <p className="text-center">You haven't searched for any recipes yet.</p>
        ) : (
          <div className="row">
            {history.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.recipe_name}</h5>
                      <p className="card-text"><small>Searched on: {item.searched_at}</small></p>
                    </div>
                    <button
                      className="btn btn-outline-primary mt-3"
                      onClick={() => handleRevisit(item.recipe_name)}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default RecipeHistory;
