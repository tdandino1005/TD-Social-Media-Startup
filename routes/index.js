// connect to the router
const router = require('express').Router();
const apiRoutes = require('./api');

// Add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

// If no routes are hit, send the error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;