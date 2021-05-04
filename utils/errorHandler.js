module.exports = (err, msg, next) => {
  const error = new Error(msg + err.message);
  error.httpStatusCode = 500;
  return next(error);
};
