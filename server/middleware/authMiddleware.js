// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const protect = async (req, res, next) => {
//   let token;

//   // Look for token in Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request (excluding password)
//       req.user = await User.findById(decoded.id).select("-password");

//       next(); // move to the next middleware/route
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

//export default protect;

import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // or fetch user details as needed
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;

