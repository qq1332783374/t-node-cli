const config = require('config-lite')(__dirname);
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

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
        default: Date.now
    }
}));