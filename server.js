const Koa = require('koa'),
    websockify = require("koa-websocket"),
    router = require("./routes/routes.js");

const app = websockify(new Koa());

app.use(router.routes(), router.allowedMethods())

var userCount = 0, // 计算当前用户数量
    ctxs = [];// 用来存储所有的websocket连接。
app.ws.use((ctx, next) => {
    console.log("建立新的ws连接！");
    console.log(`当前用户数量：${++userCount}`);
    ctxs.push(ctx); // 新加一条ws链接

    // 收到消息时触发
    ctx.websocket.on("message", (message) => {
        console.log(`收到消息：${message}。`);
        ctx.websocket.send("Hello Client")
    });

    // 关闭链接时触发
    ctx.websocket.on("close", (message) => {
        console.log("用户退出，关闭ws连接！");
        console.log(`当前用户数量：${--userCount}`);
        let index = ctxs.indexOf(ctx);
        ctxs.splice(index, 1)
    })
    // next();
})

var server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
})