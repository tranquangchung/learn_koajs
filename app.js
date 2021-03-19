const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');

const router = new KoaRouter();
const app = new Koa();

// Use the bodyparser middlware
app.use(BodyParser());
app.use(logger());

router
    .get('/', (ctx, next) => {
        // http://localhost:3000/?name=masnun
        let name = ctx.request.query.name || "World";
        ctx.body = {message: `Hello ${name}!`}
    })
    .get('/users/:id', (ctx, next) => {
        // ...
        ctx.body = 'users ' + ctx.params.id;
    })
    .post("/post", async function (ctx) {
    let name = ctx.request.body.name || "World";
    ctx.body = {message: `Hello ${name}!`}
});


// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);