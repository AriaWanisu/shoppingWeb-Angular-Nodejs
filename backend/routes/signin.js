const expressFunction = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY';

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

const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err,data) => {
            if(err){
                reject(new Error('Error bcrypt compare'))
            }else{
                resolve({status: data});
            }
        })
    });
}

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: email}, (err,data) => {
            if(err){
                reject(new Error('Cannot find email!'));
            }else{
                if(data){
                    resolve({id: data._id, email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName})
                }else{
                    reject(new Error('Cannot find email!'));
                }
            }
        })
    })
} 

router.route('/signin')
    .post( async (req, res) => {
        const playload = {
            email: req.body.email,
            password: req.body.password
        };

        console.log(playload);

        try{
            const result = await findUser(playload.email);
            const loginStatus = await compareHash(playload.password, result.password);

            const status = loginStatus.status;

            if(status){
                const token = jwt.sign(result, key, {expiresIn: 60*5});
                res.status(200).json({result, token, status});
            }else{
                res.status(200).json({status});
            }

        } catch(error){
            res.status(404).send(error);
        }
    })

    module.exports = router