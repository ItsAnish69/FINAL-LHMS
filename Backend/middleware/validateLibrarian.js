const jwt = require("jsonwebtoken");

// Example of middleware to restrict to librarians
const librarianOnly = (req, res, next) => {

  const authHeader = req.headers.authorization;

  //checks if the authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];    //get the token 
  console.log("Token received:", token);

  //verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'librarian') {
      return res.status(403).json({ message: "Access denied. Librarian only." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = librarianOnly;