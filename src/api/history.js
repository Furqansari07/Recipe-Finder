const API_BASE = "http://localhost/recipe_finder_backend";

export const saveRecipeHistory = async (user_id, recipe_name) => {
  const res = await fetch(`${API_BASE}/history/save.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, recipe_name }),
  });
  return await res.json();
};

export const fetchRecipeHistory = async (user_id) => {
  const res = await fetch(`${API_BASE}/history/fetch.php?user_id=${user_id}`);
  return await res.json();
};
