const Koa = require('koa');
const app = new Koa();

async function responseTime(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
}

app.use(responseTime);
app.listen(3000);
