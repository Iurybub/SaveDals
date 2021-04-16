exports.getLogin = (req, res) => {
  res.render("auth/login", {
    path: "login",
    pageTitle: "Admin Login",
    isAuth: req.session.isAuth,
  });
};

exports.postLogin = (req, res) => {
  req.session.isAuth = true;
  res.redirect("/");
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
