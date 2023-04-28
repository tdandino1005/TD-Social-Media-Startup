// connect to the database
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// connect to the routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export the router
module.exports = router;