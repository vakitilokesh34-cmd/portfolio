import jwt from 'jsonwebtoken';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.JWT_SECRET || '';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
  }
};

export const adminOnly = (req, res, next) => {
  const apiKey = req.headers['x-admin-token'];
  if (apiKey && apiKey === ADMIN_TOKEN) {
    req.admin = { role: 'admin' };
    return next();
  }
  res.status(403).json({ success: false, message: 'Admin access only' });
};