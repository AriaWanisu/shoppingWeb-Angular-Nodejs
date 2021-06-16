const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const transportSchema = Schema({
    name: String,
    price: Number,
    detail: String
},{
    collection: 'transport'
});

let Transport
try {
    Transport = mongoose.model('transport')
} catch (error) {
    Transport = mongoose.model('transport', transportSchema);
}

const getTransport = () => {
    return new Promise((resolve,reject) => {
        Transport.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get Transport!'));
                }
            }
        })
    })
}

router.route('/transport').get((req, res) => {
    getTransport().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router