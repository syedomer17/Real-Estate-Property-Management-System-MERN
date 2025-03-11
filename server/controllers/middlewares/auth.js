import jwt from "jsonwebtoken";
import config from "config";

const JWT_SECRET = config.get("JWT_SECRET");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // ✅ Corrected header access
    console.log("Authorization Header:", authHeader); // Debugging

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token
    console.log("Extracted Token:", token); // Debugging

    const decoded = jwt.verify(token, JWT_SECRET); // ✅ Verify token
    req.user = decoded; // ✅ Attach user data to request
    console.log("Decoded Token:", decoded); // Debugging

    next(); // ✅ Move to next middleware
  } catch (error) {
    console.log("Invalid token:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
