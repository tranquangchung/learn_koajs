const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');

const router = new KoaRouter();
const securedRouter = new KoaRouter();
const app = new Koa();

require("./mongo")(app);
const ObjectID = require("mongodb").ObjectID;
// Use the bodyparser middlware
app.use(BodyParser());
app.use(logger());
// app.use(require("./jwt"));
const jwt = require("./jwt");
// app.use(jwt.errorHandler()).use(jwt.jwt());

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

router.post("/auth", async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (username === "user" && password === "pwd") {
        ctx.body = {
            token: jwt.issue({
                user: "user",
                role: "admin"
            })
        }
    } else {
        ctx.status = 401;
        ctx.body = {error: "Invalid login"}
    }
});

// Apply JWT middleware to secured router only
securedRouter.use(jwt.errorHandler()).use(jwt.jwt());

// List all people
securedRouter.get("/people", async (ctx) => {
    ctx.body = await ctx.app.people.find().toArray();
});

// Create new person
securedRouter.post("/people", async (ctx) => {
    ctx.body = await ctx.app.people.insert(ctx.request.body);
});

// Get one
securedRouter.get("/people/:id", async (ctx) => {
    ctx.body = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
});

// Update one
securedRouter.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
});

// Delete one
securedRouter.delete("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    ctx.body = await ctx.app.people.deleteOne(documentQuery);
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

app.listen(3000);