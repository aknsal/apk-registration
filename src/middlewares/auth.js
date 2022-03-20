module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login first!");
  }
};

module.exports.isUserAdmin = (req, res, next) => {
  if (req.user&&req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Need Admin Privilages");
  }
};

module.exports.isUserOrganiser = (req, res, next) => {
  if (req.user&&req.user.isOrganiser) {
    next();
  } else {
    res.status(401).send("Need Organiser Privilages");
  }
};
