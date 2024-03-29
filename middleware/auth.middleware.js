const jwt = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = (req, res, next) => {

    console.log("auth middleware")
    // req.body.accountId = "029ce192-35ec-4c96-af05-0f36bce1fef4";
    // // req.body.accountId = "029ce192-35ec-4c96-af05-0f36bce1fef4";
    // console.log(req.body);
    // next();
  
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
        // console.log("account id", accountId)
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