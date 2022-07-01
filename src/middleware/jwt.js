const {verify} = require("./jwtUtils");
const middlewareJWT = async (req, res, next) => {
  try {
    let token = verify(req.headers.authorization);
    if(token.userId !== 1 || req.headers['user-agent'] !== token.agent) return res.status(401).json({message: 'yoqooool'});

    next();
  } catch (error) {
    return  res.status(401).json({message: 'yoqooool'});
  }
};
module.exports = middlewareJWT;


