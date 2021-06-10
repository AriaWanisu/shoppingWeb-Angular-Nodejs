const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

const userSchema = Schema({
    username: String,
    password: String
},{
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const getCustomer = (cdid) => {
    return new Promise((resolve,reject) => {
        User.findOne({username: cdid}, (err,data) =>{
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

router.route('/customer/:cdid').get((req, res) => {
    const cdid = req.params.cdid;
    getCustomer(cdid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router