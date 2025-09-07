const API_BASE = "http://localhost/recipe_finder_backend";

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/auth/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return await res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};
