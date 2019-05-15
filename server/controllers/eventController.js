const multer = require('multer');
const Event = require('../models/eventModel');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    cb(null, true);
  }  else {
    cb(new Error("OnlyImageFilesAllowed"), false);
 }
}

class EventService {

  static create(obj){
    const event = new Event(obj);
    return event.save();
  }

  static update(id, data){
      return Event.findById(id)
       .then((event)=>{
         event.set(data);
         event.save();
         return event;
       });
  }

  static read(id){
    return Event.findById(id)
      .then((event)=>{
        return event;
      });
  }

  static list(){
    return Event.find({})
      .then((events)=>{
        return events;
      });
  }

  static delete(id){
    return Event.deleteOne({_id: id})
      .then((obj)=>{
        return obj;
      })
  }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.EventService = EventService;