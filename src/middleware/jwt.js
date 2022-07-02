const { sign, verify } = require("./jwtUtils");
const middlewareJWT = async (req, res, next) => {
  try {
    const tokent = req.headers.token || req.params.id
    
    let { userId, agent } = verify(tokent);
    console.log(userId);
    if (userId !== 1) return res.status(401).json({ message: "yoqooool" });
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "yoqooool" });
  }
};
module.exports = middlewareJWT;
