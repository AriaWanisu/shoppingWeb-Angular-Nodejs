const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const userSchema = Schema({
    email:      { type: String, unique: true },
    password:   String,
    firstName:  String,
    lastName:   String,
    sex:        String,
    phone:      String,
    img:        String,
    address:    Schema.Types.Mixed,
    tier:       String,
    point:      Number
},{
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const getUser = (id) => {
    return new Promise((resolve,reject) => {
        User.findOne({email: id}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Not Found'));
                }
            }
        })
    })
}

const updateUser = (id,data) => {
    return new Promise((resolve,reject) => {
        User.updateOne({_id: id}, {firstName: data.firstName, lastName: data.lastName, phone: data.phone, img: data.img }, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

router.route('/user/:id').get((req, res) => {
    const id = req.params.id;
    getUser(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/user/:id').put((req, res) => {
    const id = req.params.id;
    const playload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        img: req.body.img,
    }
    updateUser(id,playload).then(data => {
        console.log(data);
        const status = true;
        res.status(200).json({data, status});
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router