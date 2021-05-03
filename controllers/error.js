exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Not Found",
    message: "invalid path",
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "500 Internal Server Error",
  });
};
