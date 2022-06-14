import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import serveHandler from "./handler";
import arg from "arg";
import { isNumeric } from "./utils";
import Config from "./interface";

const warning = (message: string) => `WARNING: ${message}`;
const info = (message: string) => `INFO: ${message}`;
const error = (message: string) => `ERROR: ${message}`;
const getHelp = () => `
    mini-serve - 这是一个简单的静态资源服务器

    xxx 省略10000字
`;

function startEndpoint(port: number, config: Config, args: any) {};

// 解析命令行参数 -p 的值的含义
const parseEndpoint = (endpoint: string) => {
  if (isNumeric(endpoint)) {
    return Number(endpoint);
  }

  // ...
};

const loadConfig = async function (cwd: string, entry: string, args: any) {};

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

  const cwd = process.cwd();
  const entry = args["--entry"] ? path.resolve(args["--entry"]) : cwd;

  const config = await loadConfig(cwd, entry, args);

  // startEndpoint(args['--port'] ?? 3000, args['--entry'] ?? 'index.html')
})();
