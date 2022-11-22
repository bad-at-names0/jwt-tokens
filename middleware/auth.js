const { BadRequest, Unauthorised } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.Authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new Unauthorised("No auth Headers");
  }

  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (err) {
    throw new Unauthorised(`Not valid auth header`);
  }
};

module.exports = authMiddleware;
