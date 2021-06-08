const expressFun = require('express')
const router = expressFun.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = require("mongoose").Schema
const userSchema = Schema({
    username: String,
    password: String,
}, {
    collection: 'users'
})

try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema)
}

const makeHash = async(plaintext) => {
    const result = await bcrypt.hash(plaintext, 10)
    return result
}

const insertUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password
        })
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Connot insert user to DB!'))
            }else{
                resolve({message: 'Singn up successfully'})
            }
        })
    })
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashtext => {
            const playload = {
                username: req.body.username,
                password: hashtext
            }
            console.log(playload)
            insertUser(playload)
                .then(result => {
                    console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(() => {

        })
    })
module.exports = router