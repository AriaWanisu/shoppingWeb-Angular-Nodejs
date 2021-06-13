var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = require('mongoose').Schema;
const userSchema = Schema({
    email:      { type: String, unique: true },
    password:   String,
    firstName:  String,
    lastName:   String,
    sex:        String,
    phone:      String,
    img:        String,
    address:    Schema.Types.Mixed
},{
    collection: 'users'
});
userSchema.plugin(uniqueValidator);

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async (plainText) => {
    const resultPromise = await bcrypt.hash(plainText, 10);
    return resultPromise;
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            email: dataUser.email,
            password: dataUser.password,
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            sex: dataUser.sex,
            phone: dataUser.phone,
            address: dataUser.address
        });
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({message: 'Singn up successfully'});
            }
        });
    });
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                email: req.body.email,
                password: hashText,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                phone: req.body.phone,
                address: req.body.address
            }
            console.log(playload);
            insertUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json("Email ถูกใช้ไปแล้ว");
                })
        })
        .catch(err => {
        })
    });

module.exports = router
