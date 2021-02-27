const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server_app = express();
const cors = require('cors');
const userRouter = require('./routers/user_routes');
const accountRouter = require('./routers/account_routes');
const transectionRouter = require('./routers/transection_routes')

function initilize_function() {
    configDataBase();
    configCoresPolicy();
    configBodyParser();
    setRouters();
    error404Handeler();
    errorHandler();
}
initilize_function();


function configCoresPolicy() {
    server_app.use(cors())
}

function configBodyParser() {
    server_app.use(bodyParser.json({ extended: true }));
}

async function configDataBase() {
    const databaseUrl = "mongodb+srv://abhi:1234@cluster0-nbwyw.mongodb.net/piggy_bank"; //getEnvironmentVariables().db_url;
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
    }).catch(err => { console.log(err); });
}

function setRouters() {
    server_app.use('/user', userRouter)
    server_app.use('/account', accountRouter)
    server_app.use('/transection', transectionRouter)
}

function error404Handeler() {
    server_app.use((req, res) => {
        res.status(404).json({
            msg: 'NOT FOUND',
            status: 404
        })
    })
}

function errorHandler() {
    server_app.use((err, req, res, next) => {
        res.status(500).json({
            msg: err.message || "Something went wrong. Please try again later",
            status: 500
        })
    })
}

module.exports = server_app