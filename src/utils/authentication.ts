const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const setDetails = (username: string, email: string) => {
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
};

const getDetails = () => {
  return {
    username: localStorage.getItem("username") || "none",
    email: localStorage.getItem("email") || "none",
  };
};

const getToken = () => {
  return localStorage.getItem("token") || "none";
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { setToken, getToken, removeToken, setDetails, getDetails };
