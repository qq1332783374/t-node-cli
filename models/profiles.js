const Profiles = require('../lib/mongo').Profile;

module.exports = {
	// 添加一个用户
	createUser (user) {
		let newUser = new Profiles(user)
		return newUser.save()
	},
	// 获取所有用户
	getAllUser () {
		return Profiles.find()
	},
	// 通过 id 来获取用户
	getUserById (id) {
		return Profiles.findById({
			_id: id
		})
	},
	// 通过用户 id 编辑用户信息
	editUserById (userInfo) {
		return Profiles.findByIdAndUpdate(
			{_id: userInfo._id},
			{$set: userInfo},
			{new: true}
		)
	},
	// 通过用户 id 删除用户
	deleteUserById (id) {
		return Profiles.findByIdAndRemove({
			_id: id
		})
	}
};
