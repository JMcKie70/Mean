var mongoose = require('mongoose');
var Owl = mongoose.model('Owl');

module.exports = {
  root: function(req, res){
    Owl.find({}, function(errors, data){
      if(errors){
        console.log(errors);
      }
      console.log("Index data is: ", data);
      res.render('index', {owls: data});
    })  
  },
  new: function(req, res){
    res.render('new');
  },
  owls: function(req, res){
    console.log("Body is ", req.body);
    var owl = new Owl(req.body);
    owl.save(function(errors, data){
      if(errors){
        console.log(errors);
      }
      console.log("Data is ", data);
      res.redirect('/');
    })
  },
  display: function(req, res){
    Owl.findOne({_id:req.params.id}, function(errors, owl){
      if(errors){
        console.log(errors);
      }
      console.log("Owl to display is: ", owl);
      res.render('owls', {owl: owl});
    })
  },
  edit: function(req, res){
    Owl.findOne({_id:req.params.id}, function(errors, owl){
      if(errors){
        console.log(errors);
      }
      console.log("Owl to edit is: ", owl);
      res.render('edit', {owl: owl});
    })
  },
  update: function(req, res){
    console.log("Edited body is ", req.body);
    console.log("Params", req.params);
    Owl.update({_id:req.params.id}, {$set: {name: req.body.name, information: req.body.information}}, function(errors, data){
      if(errors){
        console.log(errors);
      }
      console.log("Edited data to database is ", data);
      res.redirect('/');
    })
  },
  destroy: function(req, res){
    console.log("Deleted body is ", req.body);
    Owl.remove({_id:req.params.id}, function(errors){
      if(errors){
        console.log(errors);
      }
      console.log("Deleted!!!!")
      res.redirect('/');
      })
  }
}