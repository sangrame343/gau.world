// Auth.js

// Function to register a user
// In Auth.js
export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// utils/Auth.js
export const loginUser = (phone, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.some(
    (user) => user.phone === phone && user.password === password
  );
};

export const setAuthenticatedUser = (phone) => {
  localStorage.setItem("authenticatedUser", phone);
};

export const getAuthenticatedUser = () => {
  return localStorage.getItem("authenticatedUser");
};

export const logoutUser = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("authenticatedUser");
};

// Function to check if a user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("authenticatedUser"); // Returns true if there's an authenticated user
};
