module.exports = (req, res, next) => {
  if (req.user && req.user.permission === "admin" && req.user.active) {
    console.log("Go ahead admin.");
    next();
  } else {
    res.status(400).send("Access Denied.");
  }
};
