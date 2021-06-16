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

const productSchema = Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    img: String
 },{
     collection: 'product'
 });
 
 let Product
 try {
     Product = mongoose.model('product')
 } catch (error) {
     Product = mongoose.model('product', productSchema);
 }

const insertCart = (data) => {
    return new Promise ((resolve, reject) => {
        var new_cart = new Cart({
            pid: data.pid,
            name: data.name,
            price: data.price,
            category: data.category,
            img: data.img, 
            user: data.user,
            status: "not paid"
        });
        new_cart.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert cart to DB!'));
            }else{
                resolve({message: 'Add to cart successfully'});
            }
        });
    });
}

const getCart = (uid) => {
    return new Promise ((resolve, reject) => {
        Cart.find({user: uid , status: "not paid"}, (err,data) => {
            if(err){
                reject(new Error('err'));
            } else {
                if(data){
                    resolve(data)
                } else {
                    reject(new Error('Cannot find Cart!'));
                }
            }
        })
    })
}

const decreaseProduct = (id,quantity) => {
    return new Promise((resolve,reject) => {
        Product.updateOne({_id: id}, {quantity: quantity-1},function(err,data){
            if(err){
                reject(new Error('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const increaseProduct = (id,quantity) => {
    return new Promise((resolve,reject) => {
        Product.updateOne({_id: id}, {quantity: quantity+1},function(err,data){
            if(err){
                reject(new Error('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

const deleteCart = (id) => {
    return new Promise((resolve,reject) => {
        Cart.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Cart Delete'})
            }
        });
    });
}

router.route('/carts/:uid').post((req, res) => {
    const playload = {
        pid: req.body._id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        img: req.body.img,
        user: req.params.uid
    }
    console.log(playload);
    insertCart(playload).then(result => {
        console.log(result);
        res.status(200).json(result);
        decreaseProduct(playload.pid,req.body.quantity).then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/cart/:uid').get((req, res) => {
    const uid = req.params.uid;
    getCart(uid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/cart/:cid').delete((req,res) => {
    const cid = req.params.cid;
    deleteCart(cid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/updateproducts').put((req,res) => {
    console.log("updateproduct Work")
    const playload = {
        pid: req.body._id,
        quantity: req.body.quantity
    }
    console.log(playload)
    increaseProduct(playload.pid, playload.quantity).then(result => {
            console.log(result);
            res.status(200).json(result);
    }).catch(err => {
            console.log(err);
            res.status(404).json("error 1");
    })
})

module.exports = router