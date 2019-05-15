var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var multer = require('multer');
var eventsController = require('../controllers/eventsController');
var flash = require('express-flash');
var Event = require('../models/eventModel');
var upload = multer({
  storage: eventsController.storage,
  fileFilter: eventsController.imageFilter
});

/* GET home page. */
router.get('/', eventsController.getEvents);

router.post('/', upload.single('image'), eventsController.createEvent);

router.get('/:eventid', eventsController.readEvent);

router.post('/:eventid', eventsController.updateEvent); 

router.post('/:eventid/delete', eventsController.deleteEvent); 

router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == "OnlyImageFilesAllowed"){
      req.flash('fileUploadError', "We don't support the file type that you have uploaded.");
      res.redirect('/events');
  } else if (err.message == "EventNotSavedError"){
    req.flash('eventNotSavedError', "There was an error in saving your event. Please try again.");
    res.redirect('/events');
  } else{
     next(err);
  }
});
module.exports = router;
