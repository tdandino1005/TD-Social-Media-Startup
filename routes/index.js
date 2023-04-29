// connect to the database
const router = require('express').Router();
const apiRoutes = require('./api');

// connect to the api routes
 router.use('/api', apiRoutes);

// if the route is not found, send a 404 error
 router.use((req, res) => res.send("<h1>Wrong Route!</h1>"));



// export the router
module.exports = router;

