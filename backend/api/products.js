const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
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

const getProduct = () => {
    return new Promise((resolve,reject) => {
        Product.find({}, (err,data) =>{
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

const getSomeProduct = (id) => {
    return new Promise((resolve,reject) => {
        Product.findOne({_id: id}, (err,data) =>{
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

const decressProduct = (id,quantity) => {
    return new Promise((resolve,reject) => {
        Product.updateOne({_id: id}, {quantity: quantity-1},function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'update successfully'})
            }
        });
    });
}

router.route('/products').get((req, res) => {
    getProduct().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/products/:pid').get((req, res) => {
    const pid = req.params.pid;
    getSomeProduct(pid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router