const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const userSchema = Schema({
    email:      String,
    password:   String,
    firstName:  String,
    lastName:   String,
    sex:        String,
    phone:      String,
    address: Schema({
        street: {String},
        city:   {String},
        state:  {String},
        zip:    {Number}
    })
},{
    collection: 'users'
});

const addressSchema = Schema({
        street: {String},
        city:   {String},
        state:  {String},
        zip:    {Number}
},{
    collection: 'address'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}


let Address
try {
    Address = mongoose.model('address')
} catch (error) {
    Address = mongoose.model('address', addressSchema);
}

const getCustomer = (cdid) => {
    return new Promise((resolve,reject) => {
        User.findOne({email: cdid}, (err,data) =>{
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

const getAddress = (data) => {
    return new Promise((resolve,reject) => {
        Address.findById({_id: "60c2567a14e6286b4481c097"}, (err,data) =>{
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

router.route('/address/:cdid').get((req, res) => {
    const cdid = req.params.cdid;
    getCustomer(cdid).then(data => {
        console.log(data);
        console.log(data.address._id);
        getAddress(data).then(result => {
            console.log(result)
            res.status(200).json(result);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router