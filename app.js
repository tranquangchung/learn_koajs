const Koa = require('koa');
const app = new Koa();

const fs = require('mz/fs');

app.use(async function (ctx, next) {
    const paths = await fs.readdir('docs');
    const files = await Promise.all(paths.map(path => fs.readFile(`docs/${path}`, 'utf8')));

    ctx.type = 'markdown';
    ctx.body = files.join('');
});

app.listen(3000);


