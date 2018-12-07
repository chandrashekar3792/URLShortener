var mongoose = require('mongoose');
var schema = new mongoose.Schema(
  { short_url: Number,
     original_url: String
  }
);
var UrlShortner = mongoose.model('shortURL', schema);
module.exports=UrlShortner;
