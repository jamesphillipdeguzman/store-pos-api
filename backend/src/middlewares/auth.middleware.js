import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: 'You are not authorized to view or use this resource',
  });
};

export function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'Missing Authorization' });

  // Use regex to extract token safely (for edge cases)
  const tokenMatch = authHeader.match(/^Bearer (.+)$/);
  const token = tokenMatch ? tokenMatch[1] : null;
  // const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired token', error: err.message });
  }
}

export function hybridAuth(req, res, next) {
  if (req.isAuthenticated()) return next();

  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Use regex to extract token safely (for edge cases)
    const tokenMatch = authHeader.match(/^Bearer (.+)$/);
    const token = tokenMatch ? tokenMatch[1] : null;
    // const token = authHeader.split(' ')[1];

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  }

  res
    .status(401)
    .json({ message: 'You are not authorized to view/use this resource' });
}
