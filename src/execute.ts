import { existsSync } from "fs";
import { color } from "./utils.js";
import { Task } from "./task.js";
import { normalize } from "path";

const NODE_MODULES_BIN = normalize(`${process.cwd()}/node_modules/.bin/`);
process.env.PATH += `:${NODE_MODULES_BIN}`;

export async function executeTask(task: Task, independent = false) {
  const { summary, handler, dependencies } = task;
  if (!independent) for (const dep of dependencies) await executeTask(dep);
  console.log(color.subject(summary));
  await handler();
}

export async function executeTasksByConfigFile(
  file: string,
  keys: string[],
  independent = false
) {
  if (!existsSync(file)) return console.log(color.warning('Can`t load file:'), file);
  const tasks: Record<string, Task> = await import(file);
  for (const key of keys) {
    const task = tasks[key];
    if (!task) return console.error(color.warning('Task does not exist:'), key);
    await executeTask(task, independent);
  }
}