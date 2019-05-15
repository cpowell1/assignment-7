require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const apievents = require('./routes/api/api.events');
const mongoose = require('mongoose');
var cors = require('cors');
var routes = require('./routes/events');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-xo291.mongodb.net/test?retryWrites=true`);
var db = mongoose.connection;
db.on('open', function() {
  console.log('connected');
}).catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/api/events', apievents);
// app.use('/events', routes);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', express.static('../client/dist/assignment6'));

module.exports = app;
