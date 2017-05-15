console.log("Entering models/friends.js!!!");

var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports = {
  index: function(req,res){
    Friend.find({}, function(err, data){
      if(err){
        res.status(400).send("Information not found.");
      }
      else{
        res.json(data);
      }
    })
  },
  create: function(req,res){
    var friend = new Friend(req.body);
    friend.save(function(err,data){
      if(err){
        res.status(400).send("Friend was not saved.");
      }
      else{
        res.sendStatus(200);
      }
    })
  },
  update: function(req,res){
    Friend.update({_id:req.params.id}, req.body, function(err,data){
      if(err){
        res.status(400).send("Problem updating.")
      }
      else{
      res.json(data);
      }
    })
  },
  delete: function(req,res){
    Friend.findOne({_id:req.params.id}, function(err,data){
      if(data == null){
        res.status(400).send("Not found");
      }
      else{
      data.remove();
      res.status(200).send("Friend was deleted.");
      }
    })
  },
  show: function(req,res){
    Friend.findOne({_id:req.params.id}, function(err,data){
      if(err){
        console.log(err);
      }
      if(data == null){
        res.status(400).send("Not found");
      }
      else{
      res.json(data);
      }
    })
  }
}

console.log("Exiting models/friends.js!!!");
