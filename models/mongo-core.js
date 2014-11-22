var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/kit';

mongoose.connect(uristring);


console.log('active db', uristring);

exports.mongoose = mongoose;