import fs, { promises as fsPromises } from "fs";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

const { dirname } = import.meta;

const eventLogger = async (req, res, next, err = false) => {
  const fileName = err ? "errorLog.txt" : "reqLog.txt";
  const logData = `${format(new Date(), "dd.MM.yyyy\tHH:mm:ss")}\t${uuid()}\t${
    req.method
  }\t${req.url}${err ? `\t${err.status}\t${err.message}` : ""}\n`;

  if (!fs.existsSync(join(dirname, "..", "logs"))) {
    await fsPromises.mkdir(join(dirname, "..", "logs"));
  }
  await fsPromises.appendFile(join(dirname, "..", "logs", fileName), logData);
  console.log(`Log updated: ${req.method}\t${req.url}`);
  next();
};
export default eventLogger;