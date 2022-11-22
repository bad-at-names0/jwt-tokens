const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorised, NotFound } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest(`Provide email and password`);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`No user with email : ${email}`);
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthorised(`Invalid password of the user`);
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

module.exports = {
  login,
  register,
};
