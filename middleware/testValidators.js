// request validators
exports.insertValidator = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.contact) {
    // const error = new Error('Invalid Parameters !');
    // error.statusCode = 400;
    // throw error;
    res.json({
      message: 'Invalid/Missing parameters',
    });
  }
  next();
};
exports.fetchValidator = (req, res, next) => {
  if (!req.query.id) {
    // const error = new Error('Invalid Parameters !');
    // error.statusCode = 400;
    // throw error;
    res.json({
      message: 'Invalid/Missing parameters',
    });
  }
  next();
};
exports.updateValidator = (req, res, next) => {
  if (!req.query.id) {
    // const error = new Error('Invalid Parameters !');
    // error.statusCode = 400;
    // throw error;
    res.json({
      message: 'Invalid/Missing parameters',
    });
  }
  next();
};
exports.deleteValidator = (req, res, next) => {
  if (!req.query.id) {
    // const error = new Error('Invalid Parameters !');
    // error.statusCode = 400;
    // throw error;
    res.json({
      message: 'Invalid/Missing parameters',
    });
  }
  next();
};
