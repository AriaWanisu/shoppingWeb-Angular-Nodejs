const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const codeSchema = Schema({
   codeName: String,
   code: String,
   discount: Number,
   quantity: Number
},{
    collection: 'code'
});

let Code
try {
    Code = mongoose.model('code')
} catch (error) {
    Code = mongoose.model('code', codeSchema);
}

const getCode = () => {
    return new Promise((resolve,reject) => {
        Code.find({}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get products!'));
                }
            }
        })
    })
}

const getSomeCode = (code) => {
    return new Promise((resolve,reject) => {
        Code.findOne({code: code, quantity: {$gt:0}}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                    Code.updateOne({code: data.code}, {quantity: data.quantity - 1}, (err,data) => {
                        if(err){
                            reject(new Error('err'));
                        }else{
                            
                        }
                    })
                }else{
                    reject(new Error('Cannot get products!'));
                }
            }
        })
    })
}


router.route('/code').get((req, res) => {
    getCode().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/code/:code').get((req, res) => {
    const code = req.params.code;
    console.log
    getSomeCode(code).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})


module.exports = router