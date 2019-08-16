const config = require('config-lite')(__dirname);
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const moment = require('moment');

// 连接数据库
Mongoose.connect(config.mongoURL, { useNewUrlParser: true })
	.then(() => {
		console.log('databas connect success');
	})
	.catch(() => {
		console.log('databas connect fiale');
	})

// 登陆用户信息
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

// 管理用户信息
exports.Profile = Mongoose.model('Profile', new Schema({
	type: {
		type: String
	},
	describe: { // 用户描述
		type: String
	},
	income: { // 收入
		type: String,
		required: true
	},
	expend: { // 支出
		type: String,
		required: true
	},
	cash: { // 存款
		type: String,
		required: true
	},
	remark: { // 评论
		type: String
	},
	date: {
		type: Date,
		default: moment().format('YYYY-MM-DD HH:mm')
	}
}));