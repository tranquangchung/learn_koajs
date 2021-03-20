const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const render = require("koa-ejs");
const axios = require("axios");
const path = require("path");
const KittenModel = require("./mongo_connection");

const router = new KoaRouter();
const securedRouter = new KoaRouter();
const app = new Koa();

render(app, {
    root: path.join(__dirname, "views"),
    layout: "index",
    viewExt: "html",
});


app.use(BodyParser());
app.use(logger());
const jwt = require("./jwt");

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

router.get("users", "/users", async (ctx) => {
    const result = await axios.get("https://randomuser.me/api?results=5");

    return ctx.render("index", {
        users: result.data.results,
    });
});

// get kitten
router.get("/kitten", async (ctx) => {
    ctx.body = await KittenModel.find();
});

// Create new kitten
router.post("/kitten", async (ctx) => {
    let model = new KittenModel(ctx.request.body);
    ctx.body = await model.save();
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


// Router Middleware
app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

app.listen(3000);