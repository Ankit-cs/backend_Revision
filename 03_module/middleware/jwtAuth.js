const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY || 'yourSecretKey';

// Generate token (valid for 1 hour)
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: 300000 });
};

// Authenticate middleware
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userPayload = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, jwtAuth };
