const User = require("../models/TechSection/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token received:", token);
   
    console.log("jwt secreat is",process.env.JWT_SECRET);


    if (!token) {
      return res.status(401).json({ message: "Please log in first." });
    }


    // Verify the token
    let decodedToken;
    
    try {

      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decodedToken);

    }
     catch (error)
      {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const user = await User.findById(decodedToken?.id);
    console.log("User found:", user);
     

    if (!user) {
      return res.status(403).json({ message: "User not found. Please log in again." });
    }

    req.user = user;
    next();

   } catch (error)
   {
    console.error("Error in verifyJWT:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

};

module.exports = { verifyJWT };
