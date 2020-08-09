const { ADMIN_API, USER_API } = require('../common/constant')
const User = require('../dbmodel/User')
const { getJWTInfo } = require('../common/util')

module.exports = async (ctx,next) => {
  await next();
  try {
    const { url, headers: { authorization } } = ctx.request;
    if (ADMIN_API.includes(url) || USER_API.includes(url)) {
      const token = getJWTInfo(authorization)
      if (!token) {
        throw '当前会话过期';
      };
      const hasUser = await User.findOne({ _id: token._id })
      if (!hasUser) {
        throw '用户信息不正确';
      };
      const isAdmin = ADMIN_API.findIndex(item => item === url) > -1;
      if (isAdmin && !hasUser.admin) {
        throw '用户无权限操作';
      };
    }
  } catch(err) {
    ctx.body = {
      success: false,
      errorMsg: err
    };
  }
}
