var path = require('path');
var multer = require('multer');
var flash = require('express-flash');
var Event = require('../models/eventModel');

// configure disk storage for files handled by multer
exports.storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// configure file extension filter for uploads
exports.imageFilter = function(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    cb(null, true);
  }  else {
    cb(new Error("OnlyImageFilesAllowed"), false);
 }
}

exports.getEvents = (req, res, next)=>{
  Event.find({})
    .then((events)=>{
      res.render('events', {
        events : events,
        flashMsg: req.flash("fileUploadError")
      });
    })
    .catch((err)=>{
      if (err) {
        res.end("There was a error.");
      }
    });
}

exports.createEvent = (req, res, next)=>{
  const path = "http://localhost:8080/images/" + req.file.filename;
  const eventInfo  = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    imageurl: path,
    eventName: req.body.eventName,
    date: req.body.date,
    time: req.body.time,
    filename: req.file.filename
  }
  var event = new Event(eventInfo);
  event.save()
   .then(()=>{
     res.redirect('/events');
   }).catch((err)=>{
      throw new Error("EventNotSavedError", err);
   });
   res.redirect('/events');
}

exports.readEvent = (req, res, next)=>{
  console.log("finding junk"+req.params.eventid);
  Event.findOne({'_id': req.params.eventid})
    .then((event)=>{
      res.render('edit', {
        event: event
      });
    }).catch((err)=>{
      if (err) console.log(err);
    });
}

exports.updateEvent = async (req, res, next)=>{
  try { 
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventid, {...req.body});
    console.log('updated event');
    res.redirect('/events');
  }
  catch(err) {
    console.log(err);
  }
}


exports.deleteEvent = async (req, res, next)=>{
  try { const deletedEvent = await Event.findByIdAndDelete(req.params.eventid);
  res.redirect('/events'); }
  catch(err) {
    console.log(err);
  }
};