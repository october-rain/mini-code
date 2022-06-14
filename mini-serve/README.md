## 设计思路：

参考 [serve](https://github.com/vercel/serve/blob/3e59bc1fba/bin/serve.js)、[serve-handler](https://github.com/vercel/serve-handler/blob/master/src/index.js)

1. 配置 `interface`
2. 文件创建 `serve.ts`、`handler.ts`
3. 使用 `arg` 监听命令行参数，获取文件路径、监听端口号等等
4. 立即执行函数创建 `serve`
5. 将 `req`、`res`、`config` 传给 `handler`
6. `handler` 的开发


## 已经实现

1. 基于 stream，
2. 配置 Content-Length。
3. 指定端口号
4. 读取目录
5. 404


## 可以提高的点

1. loadConfig
2. 各种其他配置 `trailingSlash`、`cleanUrls`、`rewrite`、`redirect`等
