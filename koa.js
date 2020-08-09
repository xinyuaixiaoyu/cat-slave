const Koa = require('koa');
const fs = require('fs');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const json = require('koa-json');
const mongoose = require('mongoose');
const views = require('koa-views');
const config = require('./serverConfig');
const tokenVerify = require('./middleware/tokenVerify')

const app = new Koa();

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);

app.use(json());
app.use(tokenVerify);

app.use(require('koa-static')(__dirname + '/web/dist'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

try {
  const controllerFiles = fs.readdirSync('./controller');
  controllerFiles.forEach((item) => {
    const itemController = require(`./controller/${item}`);
    if (
      !itemController ||
      !(
        itemController instanceof Object &&
        Object.keys(itemController).length > 0
      )
    ) {
      throw `${item.replace(/.js/, '')} controller 不存在`;
    } else {
      for (let i in itemController) {
        const { method, url, route } = itemController[i];
        if (method && url && route) {
          console.log(`注册API${url}:${method}`);
          router[method](url, route);
        } else {
          throw `${item} ${i} 未按照规则暴露数据`;
        }
      }
    }
  });
} catch (err) {
  console.info(err);
}

router.get(/\/*/, async (ctx) => {
  await ctx.render('index');
});

app.use(router.routes(), router.allowedMethods());

app.listen(5050, (err) => {
  if (err) {
    console.log('listen port error', err);
  }
});

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx);
});

mongoose
  .connect(config[process.env.NODE_ENV].host)
  .then((res) => {
    console.log(`${res ? 'connected to mongo' : 'can not connect to mongo'}`);
  })
  .catch((err) => {
    console.log('mongo connect error', err);
  });
