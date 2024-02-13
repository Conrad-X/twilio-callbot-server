const jwt = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header("Authorization")

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid authorization header" });
    }
    const token = authorizationHeader.replace("Bearer ", "")

    if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authorization token not found" });
    }

    try {
        const { accountId } = jwt.verify(token, process.env.JWT_SECRET_KEY_FOR_LOGIN);
        req.body.accountId = accountId;
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

}

module.exports = { 
  authMiddleware 
}