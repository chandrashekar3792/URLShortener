'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.Promise     = global.Promise;
var cors = require('cors');
var shortURLController=require("./urlShortnerController");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGOLAB_URI, {
  useMongoClient: true,
  /* other options */
});
// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl/new", (req,res)=>{
  if(req.body.url){
      shortURLController.createShortURL(req.body.url).then((result)=>{
        res.json(result);
      }).catch(err=>res.send(err));
  }else{
    res.send({"error":"invalid Parameters"})
  }
});

app.get("/api/shorturl/:short", (req,res)=>{
  shortURLController.getActualURL(req.params.short).then((result)=>{
    res.redirect(result.original_url);
  }).catch(err=>res.send(err));
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});
