const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const tierSchema = Schema({
    tierName: String,
    condition: Number,
    special: Number
},{
    collection: 'tierList'
});

let Tier
try {
    Tier = mongoose.model('tierList')
} catch (error) {
    Tier = mongoose.model('tierList', tierSchema);
}

const getTier = () => {
    return new Promise((resolve,reject) => {
        Tier.find({}, (err,data) =>{
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


const getSomeTier = (tier) => {
    return new Promise((resolve,reject) => {
        Tier.findOne({tierName: tier}, (err,data) =>{
            if(err){
                reject(new Error('err'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get Tier!'));
                }
            }
        })
    })
}

router.route('/tier').get((req, res) => {
    console.log("getTier")
    getTier().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/tier/:tier').get((req, res) => {
    const tier = req.params.tier;
    getSomeTier(tier).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router