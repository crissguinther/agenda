function handleCSRF(err, req, res, next) {
  if (!err) return next();
  res.status(403);
  res.render("403");
  return;
}

function logging(req, res, next) {
  console.log(`[SERVER] Middleware passando`);
}

function insertCSRFToken(req, res, next) {
  res.locals.csrf = req.csrfToken();
  next();
}

module.exports = {
  handleCSRF,
  insertCSRFToken,
  logging,
};
