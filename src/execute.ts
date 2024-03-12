import { existsSync } from "fs";
import { subject, warning } from "./colors.js";
import { Task } from "./task.js";
import { normalize } from "path";

const NODE_MODULES_BIN = normalize(`${process.cwd()}/node_modules/.bin/`);
process.env.PATH += `:${NODE_MODULES_BIN}`;

export async function executeTask(task: Task, independent = false) {
  const { summary, handler, dependencies } = task;
  if (!independent) for (const dep of dependencies) await executeTask(dep);
  console.log(subject(summary));
  await handler();
  console.log('');
}

export async function executeTasksByConfigFile(
  file: string,
  keys: string[],
  independent = false
) {
  if (!existsSync(file)) return console.log(warning('Can`t load file:'), file);
  console.log('');
  const tasks: Record<string, Task> = await import(file);
  for (const key of keys) {
    const task = tasks[key];
    if (!task) return console.error(warning('Task does not exist:'), key);
    await executeTask(task, independent);
  }
}