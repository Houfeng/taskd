import { Chalk } from "chalk";

const chalk = new Chalk({ level: 3 });

const error = chalk.bold.red;
const warning = chalk.bold.hex('#FFA500');
const info = chalk.bold.green;
const subject = chalk.bold.bgGreen.whiteBright;

export const color = { error, warning, info, subject };

export { $ } from "zx";
export { glob } from 'glob';