// 'use strict';

var express = require('express');
var router = express.Router();
var key = require('../config/config.json');
var bing = require('node-bing-api')(key);
var imageModel = require('../models/imageModel.js');

console.log(key);




router.get('/api/imagesearch/:image/', function(req, res, next) {
  var results = [];
  var image = req.params.image;
  var isValidNum = Number(req.query.offset) == req.query.offset;
  var num = (isValidNum && req.query.offset) || 10;

  console.log(num);
  // console.log(isValidNum);
  console.log(image);
  var promise = new Promise(
    function (resolve, reject) {
      bing.images(image, {
        top: 10,
        skip: num
      }, function(error, res, body){
        // console.log(body.d.results);
        body.d.results.map(function (item) {
          results.push({
            url : item.MediaUrl,
            snippet : item.Title,
            thumbnail : item.Thumbnail.MediaUrl,
            context : item.SourceUrl
          });
        });
        resolve(results);
      });
    }
  );

  promise.then(function (val) {
    console.log("done");
    // console.log(val[0]);
    //to do:
    //add term and when to the database
    // term display search when is the time
    val.map(function (imageSave) {
      // console.log(v);
      var image = new imageModel({
        term : imageSave.snippet
      });

    });
    return res.json(val);
  });

});

router.get('/api/latest/imagesearch/', function (req, res, next) {
  imageModel.find(function(err, images){
      if(err) {
          return res.json(500, {
              message: 'Error getting image.'
          });
      }
      let myName = "Ahmed";
      return res.json({
        message: `my name is ${myName}`
      });
  });

});
/* GET home page. */
router.get('/*', function(req, res, next) {
  res.json({
    message : 'invalid url'
  });
});

module.exports = router;
