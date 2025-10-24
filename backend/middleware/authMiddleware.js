const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes — for any logged-in user
const protect = async (req, res, next) => {
  try {
    // ✅ Get token from cookies
    const token = req.cookies.token;
    console.log(token);
    // If no token, deny access
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User Not Found" });

    req.user = user;
    console.log("middleware test", user);
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
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
