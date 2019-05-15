//users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const eventController = require('../../controllers/eventController');
const upload = multer({
  storage: eventController.storage,
  fileFilter: eventController.imageFilter,
});
const EventService = eventController.EventService;


router.get('/', (req, res, next)=>{
   EventService.list()
    .then((events) => {
      res.status(200);
      res.send(JSON.stringify(events));
    });
});

// read
router.get('/:eventid', (req, res, next)=>{
  console.log(`finding ${req.params.eventid}`);
  EventService.read(req.params.eventid)
    .then((event) => {
     console.log(`Found Events: ${event}`);
     res.status(200);
     res.send(JSON.stringify(event));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

//update
router.put('/:eventid', (req, res, next)=>{
  console.log(`putting ${req.params.eventid}`);
  let putdata = req.body;
  EventService.update(req.params.eventid, putdata)
    .then((updatedEvent)=>{
      res.status(200);
      res.send(JSON.stringify(updatedEvent));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

 
router.post('/', upload.single('image'), async (req, res, next)=>{
  const tempPath = req.file.path;
  const path = "/images/" + req.file.filename;
  const event  = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      imageurl: path,
      eventName: req.body.eventName,
      filename: req.file.filename,
      size: req.file.size / 1024 | 0,
      date: req.body.date,
      time: req.body.time,
      title: req.body.title
      }

 try{
    const eventSave = await EventService.create(event);
    res.status(201);
    res.send(JSON.stringify(eventSave));
  }catch(err){
    console.log(err);
    throw new Error("EventSaveError", event);
  }
});

// delete
router.delete('/:eventid', (req, res, next)=>{
  let id = req.params.eventid;
  EventService.delete(req.params.eventid)
    .then((event) => {
     console.log(`Deleted Event: ${id}`);
     res.status(200);
     res.send(JSON.stringify(event));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// error
router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;
