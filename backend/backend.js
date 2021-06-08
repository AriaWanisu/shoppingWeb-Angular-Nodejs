const expressFun = require('express')
const mongoose = require('mongoose')
var expressApp = expressFun();

const url = 'mongodb://localhost:27017/univarsity'
const config =  {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
})

expressApp.use(expressFun.json())
expressApp.use((req, res , next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...')
        next()
    })
    .catch(err => {
        console.log('Connot connect to MongoDB')
        res.status(501).send('Cannot connect to MongoDB')
    })
})

expressApp.use('/user', require('./routes/user'))
expressApp.use('/login', require('./routes/signin'))
//expressApp.use('/api', require('./api/products'))

expressApp.listen(3000, function(){
    console.log('Listen on port 3000');
})