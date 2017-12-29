var mongoose = require('mongoose');
var User = mongoose.model('User');
var Journal = mongoose.model('Journal');
var currentUser;


module.exports = {
    createUser: function (req, res) {
        var user = new User({
            firstname: req.body.first,
            lastname: req.body.last,
            email: req.body.email,            
            password: req.body.password,
            dashboard_theme: "default"
        });
        user.save(function (err, user) {
            if(err){
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                console.log(err.message);
                console.log("Error adding user");
                res.json(err);
            } else {
                console.log(user.firstname);
                currentUser = req.body.email;
                req.session.currentUser = user;
                req.session.CurrentUserEmail = req.body.email;
                res.json(user);
            }
        });
    },

    loginUser: function(req,res) {
        console.log(req.session.CurrentUserEmail);
        User.find({email: req.body.email}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                currentUser = req.body.email;
                req.session.CurrentUserEmail = req.body.email;
                res.json(user);
            }
        })
    },

    grabUser: function(req,res) {
        console.log(req.session.CurrentUserEmail);
        if (!req.session.CurrentUserEmail) {
            res.json({'email': 'none'})
        } else {
            User.findOne({email: req.session.CurrentUserEmail}, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    res.json(user);
                }
            })
        }
    },

    logout: function(req,res) {
        req.session.destroy();
        res.send('test');
    }

}