const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated."));
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) return next(createError(403, "Invalid token."));
    req.user = decoded;
    next();
  });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.params.id === req.user.id || req.user.isAdmin) {
            next()
        } else {
            next(createError(403, "You are not authorized."))
        }
    }) 
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            next(createError(403, "You are not authorized as an admin."))
        }
    }) 
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}