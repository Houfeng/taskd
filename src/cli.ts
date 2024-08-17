import { cmdline } from "cmdline";
import { resolve } from "path";
import { executeTasksByConfigFile } from "./execute.js";
import { version } from "./info.js";
import { help } from "./help.js";

process.env.FORCE_COLOR = '1';

const DEFAULT_CONFIG_FILE = 'task.config.mjs';
const DEFAULT_TASK_NAME = 'default';

cmdline
  .error(() => process.exit(1))
  .version(version)
  .help(help)
  .option(['-c', '--config'], 'string')
  .option(['-i', '--independent'], "switch")
  .action(async (config: string, independent: boolean) => {
    const file = resolve(process.cwd(), config || DEFAULT_CONFIG_FILE);
    const names = cmdline.argv?.length > 0
      ? cmdline.argv : [DEFAULT_TASK_NAME];
    await executeTasksByConfigFile(file, names, independent);
  }, "*")
  .ready();