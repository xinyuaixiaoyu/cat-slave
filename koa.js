const Koa = require('koa')
const fs = require('fs')
const bodyparser = require('koa-bodyparser')
const router = require('koa-router')()
const json = require('koa-json')
const mongoose = require('mongoose')

const app = new Koa()

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}))

app.use(json())

try {
    const controllerFiles = fs.readdirSync('./controller')
    controllerFiles.forEach(item => {
        const itemController = require(`./controller/${item}`)
        if (!itemController || !(itemController instanceof Object && Object.keys(itemController).length > 0) ) {
            throw `${item.replace(/.js/,'')} controller 不存在`
        } else {
            for(let i in itemController){
                const { method, url, route } = itemController[i]
                if (method && url && route) {
                    router[method](url, route)
                } else {
                    throw `${item} ${i} 未按照规则暴露数据`
                }
            }
        }
    })    
} catch (err) {
    console.info(err)
}

app.use(router.routes(),router.allowedMethods())

app.listen(3000)

mongoose.connect('mongodb://localhost:27017/manta')