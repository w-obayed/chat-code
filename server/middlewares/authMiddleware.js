import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // find token
  const token = req.headers.authorization.split(" ")[1];

  //   token not found
  if (!token) {
    return res.status(400).json({ message: "Unauthorized!" });
  }

  // decode token
  const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

  //   token send request body
  req.body.userId = decodeToken.userId;

  next();
};

export default authMiddleware;
