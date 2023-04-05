const {User, Thought} = require('../models');

// get all users
module.exports = {
    getUser(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    },

