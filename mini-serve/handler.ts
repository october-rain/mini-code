import path from "node:path";
import http, { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import { URL } from "node:url";
import Config from "./interface";

async function processDirectory(
  absolutePath: string
): Promise<[fs.Stats | null, string]> {
  const newAbsolutePath = path.join(absolutePath, "index.html");

  try {
    const newStat = await fs.promises.lstat(newAbsolutePath);
    return [newStat, newAbsolutePath];
  } catch (e) {
    return [null, newAbsolutePath];
  }
}

// 响应 404，此处可做一个优化，比如读取文件系统中的 404.html 文件
function responseNotFound(res: ServerResponse) {
  res.statusCode = 404;
  res.end("NNNNNNot Found");
}

export default async function serveHandler(
  req: IncomingMessage,
  res: ServerResponse,
  config: Config
) {
  const pathname = new URL("http://localhost:3000" + req.url ?? "").pathname;

  let absolutePath = path.resolve(config.entry ?? "", path.join(".", pathname));
  let statusCode = 200;
  let stat = null;
  
  try {
    stat = await fs.promises.lstat(absolutePath);
  } catch (e) {}

  if (stat?.isDirectory()) {
    // 如果是目录，则去寻找目录中的 index.html
    [stat, absolutePath] = await processDirectory(absolutePath);
  }

  if (stat === null) {
    return responseNotFound(res);
  }

  let headers = {
    // 取其文件系统中的体积作为其大小
    // 问: 文件的大小与其编码格式有关，那么文件系统的体积应该是如何确定的？
    "Content-Length": stat.size,
  };

  res.writeHead(statusCode, headers);

  fs.createReadStream(absolutePath).pipe(res);
}
