const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const router = expressFunction.Router();

var Schema = require('mongoose').Schema;

var Schema = require('mongoose').Schema;
const favoriteSchema = Schema({
    pid: String,
    name: String,
    price: Number,
    category: String,
    img: String, 
    user: String,
},{
    collection: 'favorite'
});

let Favorite
try {
    Favorite = mongoose.model('favorite')
} catch (error) {
    Favorite = mongoose.model('favorite', favoriteSchema);
}

const insertFavorite = (data) => {
    return new Promise ((resolve, reject) => {
        var new_favorite = new Favorite({
            pid: data.pid,
            name: data.name,
            price: data.price,
            category: data.category,
            img: data.img, 
            user: data.user,
        });
        new_favorite.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert cart to DB!'));
            }else{
                resolve({message: 'Add to favorite successfully'});
            }
        });
    });
}

const getFavorite = (uid) => {
    return new Promise ((resolve, reject) => {
        Favorite.find({user: uid}, (err,data) => {
            if(err){
                reject(new Error('err'));
            } else {
                if(data){
                    resolve(data)
                } else {
                    reject(new Error('Cannot find favorite!'));
                }
            }
        })
    })
}

const deleteFavorite = (id) => {
    return new Promise((resolve,reject) => {
        Favorite.deleteOne({_id: id}, function(err,data){
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Cart Delete'})
            }
        });
    });
}

router.route('/favorite/:uid').post((req, res) => {
    const playload = {
        pid: req.body._id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        img: req.body.img,
        user: req.params.uid
    }
    console.log(playload);
    insertFavorite(playload).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/favorite/:uid').get((req, res) => {
    const uid = req.params.uid;
    console.log(uid);
    getFavorite(uid).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

router.route('/favorite/:id').delete((req,res) => {
    const id = req.params.id;
    deleteFavorite(id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    })
})

module.exports = router