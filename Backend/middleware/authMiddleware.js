const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode it
      const decoded = jwt.verify(token, "your_jwt_secret");

      // Get the user from the decoded token and attach it to the request
      req.user = await User.findById(decoded.userId).select("-password");
      
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
