import morgan from "morgan";
import { morganTime } from "../utils/timeService";
import chalk from "chalk";
import fs from "fs";
import path from "path";

const logFile = path.join(__dirname, "/logs/access.log");

const morganLogger = morgan((tokens, req, res) => {
  const status = tokens.status(req, res);
  const morganString = [
    morganTime(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "MS",
  ].join(" ");

  if (+status! >= 400) {
    fs.mkdir(path.dirname(logFile), { recursive: true }, (err) => {
      if (err) throw err;

      fs.createWriteStream(logFile, { flags: "a" }).write(
        morganString,
        "utf-8"
      );
    });
    return chalk.redBright(morganString);
  }
  return chalk.cyanBright(morganString);
});

export default morganLogger;
