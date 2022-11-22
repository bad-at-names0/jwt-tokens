const login = async (req, res) => {
  res.send("Login route");
};

const register = async (req, res) => {
  res.send("Register a user");
};

module.exports = {
  login,
  register,
};
