const routerData = {};
const User = require('../dbmodel/User');
const { getJWTInfo, getToken } = require('../common/util')

routerData.register = {
  method: 'post',
  url: '/register',
  route: async (ctx) => {
    try {
      const { name, password, email,repeatPassword } = ctx.request.body;
      if (!name || !password || !email || !repeatPassword) {
        throw '用户信息不完整'
      }
      if (password !== repeatPassword) {
        throw '两次输入密码不一致'
      }
      const hasUser = await User.findOne({ name });
      if (hasUser) {
        throw '用户已存在';
      }
      const hasEmail = await User.findOne({ email });
      if (email && hasEmail) {
        throw '邮箱已被注册';
      }
      const saveUser = await new User({
        name,
        password,
        email,
      }).save();
      delete saveUser._doc.password;
      ctx.body = {
        success: true,
        ...saveUser._doc,
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.login = {
  method: 'post',
  url: '/login',
  route: async (ctx) => {
    try {
      const { name, password } = ctx.request.body;
      const hasUser = await User.findOne({ name });
      const hasEmail = await User.findOne({ email: name });
      const date = new Date()
      date.setDate(date.getDate() + 1)
      if(!hasUser && !hasEmail){
        throw '用户名/邮箱不存在'
      }
      if(hasUser){
        if(hasUser._doc.password === password){
          const token = getToken({ _id: hasUser._id })
          delete hasUser._doc.password;
          ctx.cookies.set('token', token, {
            expires: date,
            path: '/',
            httpOnly: false,
            overwrite: false
          })
          ctx.body = {
            success: true,
            token,
            ...hasUser._doc
          };
        }else{
          throw '用户名与密码不匹配'
        }
      }else{
        if(hasEmail._doc.password === password){
          const token = getToken({ _id: hasEmail._id })
          ctx.cookies.set('token', token, {
            expires: date,
            path: '/',
            httpOnly: false,
            overwrite: false
          })
          delete hasEmail._doc.password;
          ctx.body = {
            success: true,
            token,
            ...hasEmail._doc
          };
        }else{
          throw '邮箱与密码不匹配'
        }
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.queryUserByToken = {
  method: 'post',
  url: '/queryUserByToken',
  route: async (ctx) => {
    try {
      const { headers: { authorization } } = ctx.request;
      if (!authorization) {
        return ctx.body = {
          success: true,
          isLogin: false
        }
      }
      const userInfo = await getJWTInfo(authorization)
      if (!userInfo) {
        throw '用户信息不存在'
      }
      const hasUser = await User.findOne({ _id: userInfo._id })
      if (!hasUser) {
        throw '用户不存在';
      }
      delete hasUser._doc.password;
      ctx.body = {
        success: true,
        ...hasUser._doc,
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.updateUser = {
  method: 'post',
  url: '/updateUser',
  route: async (ctx) => {
    try {
      const { name, email, password, avator } = ctx.request.body;
      const { headers: { authorization } } = ctx.request;
      const userInfo = await getJWTInfo(authorization)
      if (!userInfo._id) {
        throw '用户鉴权失败'
      }
      const changeData = {
        name,
        email,
        avator
      }
      if (password) {
        changeData.password = password
      }
      const saveUser = await User.updateOne(
        { _id: userInfo._id },
        { $set: changeData }
      );
      if (!saveUser) {
        throw '用户信息错误';
      }
      ctx.body = {
        success: true,
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};


routerData.queryAdmin = {
  method: 'post',
  url: '/queryAdmin',
  route: async (ctx) => {
    try {
      const { headers: { authorization } } = ctx.request;
      if (!authorization) {
        return ctx.body = {
          success: true,
          isLogin: false
        }
      }
      const userInfo = await getJWTInfo(authorization)
      if (!userInfo) {
        throw '用户信息不存在'
      }
      const hasUser = await User.findOne({ _id: userInfo._id })
      if (!hasUser) {
        throw '用户不存在';
      }
      ctx.body = {
        success: true,
        admin: hasUser._doc.admin || false
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};


module.exports = routerData;
