const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');

const router = new KoaRouter();
const app = new Koa();

require("./mongo")(app);
const ObjectID = require("mongodb").ObjectID;
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
    })

// List all people
router.get("/people", async (ctx) => {
    ctx.body = await ctx.app.people.find().toArray();
});
// Create new person
router.post("/people", async (ctx) => {
    ctx.body = await ctx.app.people.insert(ctx.request.body);
});
router.get("/people/:id", async (ctx) => {
    ctx.body = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
});
// Update one
router.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
});
// Update one
router.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);