const routerData = {};
const Article = require('../dbmodel/Article');

routerData.changeArticle = {
  method: 'post',
  url: '/changeArticle',
  route: async (ctx) => {
    try {
      const { id, title, describe, category, article } = ctx.request.body;
      if (!title || !describe || !category || !article) {
        throw '数据不符合要求';
      }
      if (id) {
        await Article.updateOne(
          { _id: id },
          { $set: { title, describe, category, article } }
        );
        ctx.body = {
          success: true,
        };
      } else {
        const saveArticle = await new Article({
          title,
          describe,
          category,
          article,
        }).save();
        ctx.body = {
          success: true,
          ...saveArticle._doc,
        };
      }
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.queryArticle = {
  method: 'post',
  url: '/queryArticle',
  route: async (ctx) => {
    try {
      const { categoryId = '' } = ctx.request.body;
      let queryData = [];
      if (!categoryId) {
        queryData = await Article.find();
      } else {
        queryData = await Article.find({ category: categoryId });
      }
      if (!queryData) {
        throw '查询失败，稍后重试';
      }
      const finalData = queryData.map((item) => {
        return {
          id: item._id,
          title: item.title,
          category: item.category,
          date: item.created,
          describe: item.describe,
        };
      });
      ctx.body = {
        success: true,
        articleList: queryData.length > 0 ? finalData : [],
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.queryArticleDetail = {
  method: 'post',
  url: '/queryArticleDetail',
  route: async (ctx) => {
    try {
      const { id } = ctx.request.body;
      if (!id) {
        throw '参数不正确';
      }
      const hasArticle = await Article.findOne({ _id: id });
      if (!hasArticle) {
        throw '文章不存在';
      }
      ctx.body = {
        success: true,
        detail: {
          ...hasArticle._doc,
        },
      };
    } catch (err) {
      ctx.body = {
        success: false,
        errorMsg: err,
      };
    }
  },
};

routerData.delArticle = {
  method: 'post',
  url: '/delArticle',
  route: async (ctx) => {
    try {
      const { id } = ctx.request.body;
      if (!id) {
        throw '参数不正确';
      }
      const hasArticle = await Article.findOne({ _id: id });
      if (!hasArticle) {
        throw '文章不存在';
      }
      const delArticle = await Article.deleteOne({ _id: id });
      if (!delArticle) {
        throw '网络异常，请稍后再试';
      }
      ctx.body = {
        success: true,
        ...delArticle._doc,
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
