var express = require('express');
var router = express.Router();
var path = require('path');


router.post('/add', function(req, res){
  var packageX = req.body["x"];
  var packageY = req.body["y"];
  var carePack = {};
  carePack.woah = parseFloat(packageX) + parseFloat(packageY);

  res.send(carePack);
});
router.post('/subtract', function(req, res){
  var packageX = req.body["x"];
  var packageY = req.body["y"];
  var carePack = {};
  carePack.woah = parseFloat(packageX) - parseFloat(packageY);
  res.send(carePack);
});
router.post('/multiply', function(req, res){
  var packageX = req.body["x"];
  var packageY = req.body["y"];
  var carePack = {};
  carePack.woah = parseFloat(packageX) * parseFloat(packageY);

  res.send(carePack);
});
router.post('/divide', function(req, res){
  var packageX = req.body["x"];
  var packageY = req.body["y"];
  var carePack = {};
  carePack.woah = parseFloat(packageX) / parseFloat(packageY);

  res.send(carePack);
});


router.get('/*',function(req,res){
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname,'../public/',file));
});


module.exports = router;
