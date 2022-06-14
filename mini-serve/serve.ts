import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import serveHandler from "./handler";
import arg from "arg";
import { isNumeric } from "./utils";

const error = (message: string) => `ERROR: ${message}`;
const getHelp = () => `
    mini-serve - 这是一个简单的静态资源服务器

    xxx 省略10000字
`;

function startEndpoint(port: number, entry: string) {
  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      console.log("start 执行");
      serveHandler();
    }
  );

  server.on('error', err => {
    // 表示端口号已被占用
    if ((err as any).code === 'EADDRINUSE') {
      setTimeout(() => {
        server.close();
        startEndpoint(port + 1, entry)
      }, 0)
			return
		}

		process.exit(1);
  })

  server.listen(port, () => {
    console.log(`
    Server is listening on port ${port}
    Open http://localhost:${port}
`);
  });

}

// 解析命令行参数 -p 的值的含义
const parseEndpoint = (endpoint: string) => {
  if (isNumeric(endpoint)) {
    return Number(endpoint);
  }

  // todo 其他情况
  // ...
};

// todo 加载配置
// const loadConfig = async function (cwd: string, entry: string, args: any) {};

(async () => {
  let args = null;
  try {
    args = arg({
      "--help": Boolean,
      "--port": parseEndpoint,
      "--entry": String,
      "-h": "--help",
      "-p": "--port",
      "-e": "--entry",
    });
  } catch (err: any) {
    console.error("错误", error(err.message));
    process.exit(1);
  }

  if (args["--help"]) {
    console.log(getHelp());
    return;
  }

  // todo
  // 其他参数

  // todo 加载配置
  // const cwd = process.cwd();
  // const entry = args["--entry"] ? path.resolve(args["--entry"]) : cwd;
  // const config = await loadConfig(cwd, entry, args);

  startEndpoint(args['--port'] ?? 3000, args['--entry'] ?? 'index.html')
})();
