const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create (user) {
        let newUser = new User(user)
        return newUser.save()
    },
    // 通过邮箱查找用户
    findByEmail: function findByEmail (eMaile) {
        return User
            .findOne({email: eMaile})
    }
}