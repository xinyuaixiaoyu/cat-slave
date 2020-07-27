const routerData = {}
const Article = require('../dbmodel/Article')

routerData.changeArticle = {
    method: 'post',
    url: '/changeArticle',
    route: async (ctx) => {
        try {
            const { _id, title, describe, category, articleDetail } = ctx.request.body;
            let currentData = {}
            if (title && describe && category && articleDetail) {
                currentData = {
                    title,
                    describe,
                    category,
                    articleDetail
                }
            } else {
                throw '数据不符合要求'
            }
            if (_id) {
                currentData._id = _id
            }
            const saveArticle = await new Article(currentData).save()
            ctx.body = {
                success: true,
                ...saveArticle._doc
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