const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const httpStatus = require('http-status');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }

  return next();
};
