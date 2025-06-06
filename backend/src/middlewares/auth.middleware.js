export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: 'You are not authorized to view or use this resource',
  });
};
