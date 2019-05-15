var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var schema = new Schema({
  originalname: {type: String, required:true},
  mimetype: {type: String, required:true},
  filename: {type: String, required:true},
  imageurl: {type: String, required:true},
  eventName: {type: String, required:false},
  date: {type: String, required:false},
  time: {type: String, required:false},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  title: {type: String, required:true}
});

schema.pre('save', function(next){
  if (!this.createdAt){
    this.createdAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
});


module.exports = mongoose.model("Event", schema);
