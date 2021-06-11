var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const userSchema = Schema({
    email:      String,
    password:   String,
    firstName:  String,
    lastName:   String,
    sex:        String,
    phone:      String,
    address:    Schema.Types.Mixed
},{
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const updateUser = (id,data) => {
    return new Promise ((resolve, reject) => {
        User.updateOne({_id: id}, {address: data}, function(err,data) {
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'add address successfully'})
            }
        });
    });
}

router.route('/address').post((req, res) => {
        const playload = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
        }
        updateUser(req.body.id,playload)
            .then(data => {
               console.log(data);
               res.status(200).json(data);
            })
            .catch(err => {

            }) 
    });

module.exports = router
