const config = require('config-lite')(__dirname);
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const moment = require('moment');

// 连接数据库
Mongoose.connect(config.mongoURL)
    .then(() => {
        console.log('databas connect');
    })
    .catch(() => {
        console.log('fiale');
    })

exports.User = Mongoose.model("User", new Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    avatar: {
        type: "string"
    },
    date: {
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm')
    }
}));