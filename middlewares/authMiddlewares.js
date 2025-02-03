const User = require('../models/TechSection/User');
const jwt = require('jsonwebtoken');

const env = require('dotenv');
env.config();

const verifyJWT = async (req, res, next) => {
  try {

  
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("token is",token)
    

    // Check if token exist
    if (!token) {
      
      throw new Error(401, "Please log in first.");

    }


    let decodedToken;

    // Verify the token and extract the payload
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      console.log("token decode",decodedToken);
    } catch (error) {
      throw new Error(402, "Invalid or expired token.");
    }

    const user = await User.findById(decodedToken?._id);
    console.log("user decode",user);
   
    if (!user) {
      throw new Error(403, "User not found. Please log in again.");

    }

    
    req.user = user;

    // Move to the next middleware

    next();
  } catch (error) {
    
    // Handle any other errors (like DB errors)
    return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
}

module.exports = {verifyJWT};