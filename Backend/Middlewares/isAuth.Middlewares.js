import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = verifyToken.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: `Invalid or expired token ${error}`
    });
  }
};
