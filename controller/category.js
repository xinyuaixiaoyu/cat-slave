const routerData = {}
const Category = require('../dbmodel/Category')

routerData.addCategory = {
    method: 'post',
    url: '/addCategory',
    route: async (ctx) => {
        try {
            const { name } = ctx.request.body;
            if (!name) {
                throw '请输入分类名'
            }
            const hasName = await Category.findOne({ name })
            if (hasName) {
                throw '分类名已存在'
            }
            const saveCategory = await new Category({
                name,
            }).save()
            ctx.body = {
                success: true,
                ...saveCategory._doc
            }
        } catch(err) {
            ctx.body = {
                success: false,
                errorMsg: err
            }
        }
    }
}

routerData.delCategory = {
    method: 'post',
    url: '/delCategory',
    route: async (ctx) => {
        try {
            const { categoryId } = ctx.request.body
            const hasCategory = await Category.findOne({ _id: categoryId })
            if (!hasCategory) {
                throw '分类不存在'
            }
            const delCategory = await Category.deleteOne({ _id: categoryId })
            ctx.body = {
                success: true,
                ...delCategory._doc
            }
        } catch(err) {
            ctx.body = {
                success: false,
                errorMsg: err
            }
        }
    }
}

routerData.queryCategory = {
    method: 'post',
    url: '/queryCategory',
    route: async (ctx) => {
        try {
            const { current, pageSize } = ctx.request.body;
            if (current <= 0 || pageSize <= 0) {
                throw '入参不正确'
            }
            const allData = await Category.find()
            const findCategory = await Category.find().skip((current -1) * pageSize).limit(pageSize)
            const categoryList = findCategory.map(item => {
                return {
                    name: item.name,
                    categoryId: item._id
                }
            })
            ctx.body = {
                success: true,
                categoryList: findCategory.length > 0 ? categoryList : [],
                total: allData.length,
                current: current,
                pageSize: pageSize
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