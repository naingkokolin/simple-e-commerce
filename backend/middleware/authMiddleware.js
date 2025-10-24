const jwt = require("jsonwebtoken");
const User = require("../models/User"); // optional if you want to fetch full user data

// Protect routes (any logged-in user)
const protect = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Option 1: If you stored user data in the token directly
    req.user = decoded;

    // Option 2: If you want to fetch user from DB
    // req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Restrict access to admins
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { protect: protect, admin };
