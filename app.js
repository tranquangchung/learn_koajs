const Koa = require('koa');
const KoaRouter = require('koa-router');

const router = new KoaRouter();
const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.body = "Nothing";
});

router.get('/hello', (ctx, next) => {
    ctx.body = "Hello world";
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);