const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const cartSchema = Schema({
    pid: String,
    name: String,
    price: Number,
    category: String,
    img: String, 
    user: String,
    status: String
},{
    collection: 'cart'
});

let Cart
try {
    Cart = mongoose.model('cart')
} catch (error) {
    Cart = mongoose.model('cart', cartSchema);
}

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

const updateCart = (uid) => {
    return new Promise ((resolve, reject) => {
        Cart.updateMany({user: uid}, {status: "paid"},function(err,data){
            if(err){
                reject(new Error('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const updateUser = (uid,point,tier) => {
    return new Promise ((resolve, reject) => {
        User.updateOne({_id: uid}, {point: point,tier: tier},function(err,data){
            if(err){
                reject(new Error('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

router.route('/paid/:uid').put((req,res) => {
    const uid = req.params.uid;
    updateCart(uid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/upgade/:uid').put((req,res) => {
    const uid = req.params.uid;
    const point = req.body.point;
    const tier = req.body.tier;
    console.log(req.params.uid)
    console.log(req.body)
    if(point >= 1000000){
        updateUser(uid, point, "god tier").then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    } else if(point >= 2000){
        updateUser(uid, point, "Normal Tier").then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    } else {
        updateUser(uid, point, tier).then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    }
    
})

module.exports = router