createAnswer: function(req,res){
    Question.findOne({_id: req.params.postId}, function(err, post){
      if(err){
        res.status(400).send("Question not Found!!")
      }
      else{
      var answer = new Answer(req.body)
      answer._user = req.session.user._id;
      answer._question = question._id
      answer.save(function(err, answer){
        if(err){
          console.log("Create Answer Operation Failed");
        }
        else{
          console.log("answer creation testing question.....pushing to question.");
          question.answers.push(answer);
          question.save(function(err, updatedQuestion){
            if(err){
              res.status(400).send("Answer not saved to question")
                }
                else{
                User.findOne({_id: req.session.user._id}, function(err,user){
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log("answer creation testing user.....pushing to user.");
                    user.responses.push(finalRes);
                    user.save(function(err,data){
                      if(err){
                        console.log(err);
                      }
                      else{
                        res.sendStatus(200);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },