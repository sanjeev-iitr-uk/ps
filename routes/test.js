const express = require('express');

const router = express.Router();

const testControllers = require('../controllers/testControllers');
const testValidators = require('../middleware/testValidators');

const { insertValidator } = testValidators;
const { insertController } = testControllers;

// GET /ride with validation middleware and controller
router.all('/', (req, res) => {
  console.log('no resource avilable !');
  res.status(200).send('ok');
});
router.post('/insert', insertValidator, insertController);
module.exports = router;
