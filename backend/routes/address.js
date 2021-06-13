var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authorization = require('../config/authorize')

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
                resolve({message: 'Add address successfully'})
            }
        });
    });
}

router.route('/address/:id').put( (req, res) => {
        const id = req.params.id;
        const playload = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip,
        }
        updateUser(id,playload)
            .then(data => {
               console.log(data);
               const status = true;
               res.status(200).json({data, status});
            })
            .catch(err => {

            }) 
    });

module.exports = router
