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

const makeHash = async (plainText) => {
    const resultPromise = await bcrypt.hash(plainText, 10);
    return resultPromise;
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
                    resolve({id: data._id, email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName, tier: data.tier, point: data.point})
                }else{
                    reject(new Error('Cannot find email!'));
                }
            }
        })
    })
} 

const findUserPWD = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({_id: id}, (err,data) => {
            if(err){
                reject(new Error('Cannot find email!'));
            }else{
                if(data){
                    resolve({id: data._id, password: data.password})
                }else{
                    reject(new Error('Cannot find email!'));
                }
            }
        })
    })
} 

const changePassword = (id, password) => {
    return new Promise((resolve, reject) => {
        User.updateOne({_id: id}, {password: password}, function(err,data) {
            if(err){
                reject(new err('err'))
            }else{
                resolve({message: 'Change password successfully!!'})
            }
        });
    });
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

router.route('/password/:id').put( async (req, res) => {
    const id = req.params.id;
    const playload = {
        password: req.body.password,
        newPassword: req.body.newPassword
    };

    console.log(playload);

    try{
        const result = await findUserPWD(id);
        const loginStatus = await compareHash(playload.password, result.password);

        const status = loginStatus.status;

        console.log(playload);

        if(status){
            makeHash(playload.newPassword)
                .then(hashText => {
                    changePassword(id, hashText).then(data => {
                        console.log(data);
                        const pwdstatus = true;
                        res.status(200).json({data, pwdstatus});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json(err);
                    })
                })
                .catch(err => {
                })
        }else{
            res.status(200).json({status});
        }

    } catch(error) {

    }
})


module.exports = router