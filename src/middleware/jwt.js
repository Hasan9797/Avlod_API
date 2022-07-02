const { sign, verify } = require("./jwtUtils");
const middlewareJWT = async (req, res, next) => {
  try {
    const token = sign({userId: 1})
    // console.log(token);
    let {userId, agent} = verify(req.headers.token);
    if (userId !== 1)
      return res.status(401).json({ message: "yoqooool" });
    req.userId = userId
    next();
  } catch (error) {
    return res.status(401).json({ message: "yoqooool" });
  }
};
module.exports = middlewareJWT;
