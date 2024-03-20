const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(statusCodes.StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization Invalid" });
  }
  const token = authHeader.split(" ")[1];

  try {
    ////check validation
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(statusCodes.StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization Invalid" });
  }
}

module.exports = authMiddleware;
