let isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

export const login = () => {
  isAuthenticated = true;
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  isAuthenticated = false;
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("Name");
};

export const checkAuthenticated = () => {
  return isAuthenticated;
};
