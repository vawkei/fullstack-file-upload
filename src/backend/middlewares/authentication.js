const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;

  //console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "You are not Authorized to view this route" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_III);
    //console.log(decoded);
    req.user = { id: decoded.id, name: decoded.name };
    
   // console.log(req.user);

    next()
  } catch (error) {
    res.status(401).json({ msg: "f*** off!" });
  }
};

module.exports = authenticationMiddleware;