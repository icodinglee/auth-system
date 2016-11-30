// Importing Node packages required for schema
const mongoose = require('mongoose'),
      Schema = mongoose.Schema

//================================
// User Schema
//================================
const FileSchema = new Schema({
  name: {
    type: String
  },
  size: {
    type: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('File', FileSchema);
