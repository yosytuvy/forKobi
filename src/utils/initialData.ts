import chalk from "chalk";
import { client } from "../dbAccess/postgresConnection";
import {
  addDataToTableQuery,
  addTableQuery,
  checkExistDataQuery,
  checkExistTableQuery,
} from "./queries";

const initialData = async () => {
  try {
    const checkTableExist = await client.query(checkExistTableQuery);
    if (!checkTableExist.rows[0].to_regclass) {
      console.log(chalk.cyan(`Initial table...`));
      await client.query(addTableQuery);

      console.log(chalk.greenBright(`Add data to table...`));
      await client.query(addDataToTableQuery);
    } else {
      const data = await client.query(checkExistDataQuery);
      if (data.rows.length === 0) {
        console.log(chalk.greenBright(`Add data to table...`));
        await client.query(addDataToTableQuery);
      }
    }
    return "Postgres Database initial successfully";
  } catch (error) {
    console.log(error);
    return "error has accord during inital data";
  }
};

export default initialData;
