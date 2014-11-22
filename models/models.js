var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var messureSchema = Schema({
  temperarure: Number,
  humidity: Number,
  pressure: Number,
  deviceId: String, 
  created: { type: Date, default: Date.now },
}, 

{
  collection: 'measures'
});




var preferencesSchema = Schema({
  temperature: Number,
  deviceId: String, 
  status: String,
  created: { type: Date, default: Date.now },
}, 
{
  collection: 'preferences'
});

module.exports = {
	measures: mongoose.model('Measure', messureSchema), 
	preferences: mongoose.model('Preference', preferencesSchema)
};


