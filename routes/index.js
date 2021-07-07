const express = require('express');

const router = express.Router();

// import routes
const testRoutes = require('./test');
// other routes

router.all('/', (req, res) => {
  res.status(200).send('affiliate_engine server is running on 8080');
});
router.use('/test', testRoutes);

module.exports = router;
