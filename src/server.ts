import express from "express";
import "dotenv/config";
import connectionToMongoDb from "./dbAccess/mongoDBConnection";
import { connectionToPostgres } from "./dbAccess/postgresConnection";
import router from "./router/router";
import morganLogger from "./logger/morgan";
import cors from "./cors/cors";
import initialData from "./utils/initialData";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(express.text());
app.use("/", router);

if (!PORT) throw new Error("invalid port");
app.listen(PORT, () => {
  console.log(chalk.bgCyan(`listening on port ${PORT}`));
  connectionToMongoDb()
    .then((message) => console.log(chalk.blue(message)))
    .catch((error) => console.log(chalk.redBright(error.message)));
  connectionToPostgres()
    .then((message) => {
      console.log(chalk.magenta(message));
      initialData()
        .then((message) => console.log(chalk.cyan(message)))
        .catch((message) => console.log(chalk.redBright(message)));
    })
    .catch((error) => console.log(chalk.redBright(error.message)));
});
