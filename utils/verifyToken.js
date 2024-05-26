const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

async function createJWT(req, res, next) {
  const email = req.query.email;
  const query = { email: email };
  const user = await User.findOne(query);
  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "3d",
    });
    return res.send({ accessToken: token });
  }
  res.status(403).send({ accessToken: "You are not authenticated" });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("You are not authenticated");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

module.exports = {
  createJWT,
  verifyToken,
};
