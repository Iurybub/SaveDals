module.exports = (err, msg) => {
  const error = new Error(msg + err.message);
  error.httpStatusCode = 500;
  next(error);
};
