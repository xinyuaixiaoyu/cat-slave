const routerData = {}
const User = require('../dbmodel/User')

routerData.register = {
    method: 'post',
    url: '/register',
    route: async (ctx,next) => {
        try {
            const { name, password, email } = ctx.request.body;
            const hasUser = await User.findOne({ name })
            if (hasUser) {
                throw '用户已存在'
            }
            const hasEmail = await User.findOne({ email })
            if (email && hasEmail) {
                throw '邮箱已被注册'
            }
            const saveUser = await new User({
                name,
                password,
                email
            }).save()
            delete saveUser._doc.password
            ctx.body = {
                success: true,
                ...saveUser._doc
            }
        } catch(err) {
            ctx.body = {
                success: false,
                errorMsg: err
            }
        }
    }
}

module.exports = routerData