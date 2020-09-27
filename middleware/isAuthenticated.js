module.exports = function isAuthenticated(req, res, next) {
  if (!req.user) return res.status(400).send("not authenticated"); //! add status
  next();
};
