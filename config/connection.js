// create connection to mongodb
// const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');


mongoose.connect('mongodb://localhost/socialmediadb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

// module.exports = mongoose.connection;
module.exports = connection;