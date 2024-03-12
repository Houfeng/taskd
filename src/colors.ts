import { Chalk } from "chalk";

const chalk = new Chalk({ level: 3 });

export const error = chalk.bold.red;
export const warning = chalk.bold.hex('#FFA500');
export const info = chalk.bold.green;
export const subject = chalk.bold.bgGreen.whiteBright;

export const colors = { error, warning, info, subject };