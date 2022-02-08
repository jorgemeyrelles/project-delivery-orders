const jwt = require('jsonwebtoken');

const secret = require('fs')
.readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' })
.trim();

const create = (id, email) => {
  const payload = { id, email };
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '30d',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

const validateJWT = async (req, res, next) => {
  const token = await req.headers.authorization;
  console.log('teste', token);
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const ret = await verify(token);
    console.log(ret);
    req.userInfo = ret;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { create, verify, validateJWT };
