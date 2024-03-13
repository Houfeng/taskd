/**
 * Task handle function
 */
export type TaskHandler = () => Promise<unknown> | unknown;

function isTaskHandler(value: unknown): value is TaskHandler {
  return typeof value === 'function';
}

/**
 * Task 
 */
export type Task = {
  summary: string;
  handler: TaskHandler;
  dependencies: Task[];
  parallel?: boolean;
};

/**
 * Define tasks and specify summary & dependencies
 * 
 * @param summary       task summary
 * @param dependencies  dependencies tasks
 * @returns 
 */
export function task(summary: string, dependencies: Array<Task>): Task;
/**
 * Define tasks and specify summary & handler
 * 
 * @param summary  task summary
 * @param handler  task handler
 * @returns 
 */
export function task(summary: string, handler: TaskHandler): Task;
/**
 * Define tasks and specify summary & dependencies & handler
 * 
 * @param summary       task summary
 * @param dependencies  dependencies tasks
 * @param handler       task handler
 * @returns 
 */
export function task(summary: string, dependencies: Array<Task>, handler: TaskHandler): Task;
export function task(summary: string, ...args: unknown[]): Task {
  const fistArg = args[0];
  const lastArg = args[args.length - 1];
  const dependencies: Array<Task> = Array.isArray(fistArg) ? fistArg : [];
  const handler = isTaskHandler(lastArg) ? lastArg : ((): unknown => void 0);
  return { summary, dependencies, handler };
}

/**
 * Parallel task
 * @param tasks dependencies tasks
 * @returns 
 */
export function P(...tasks: Task[]): Task {
  const handler = () => Promise.all(tasks.map(task => task.handler()));
  const summary = tasks.map(it => it.summary).join(',');
  const dependencies: Task[] = [];
  return { summary, dependencies, handler };
}

/**
 * Convert to No Dependency Task
 * @param task task
 */
export function I(task: Task): Task;
/**
 * Convert to No Dependency Task
 * @param tasks tasks
 */
export function I(...tasks: Task[]): Task[]
export function I(task: Task, ...tasks: Task[]): Task | Task[] {
  if (tasks.length === 1) return { ...task, dependencies: [] };
  return tasks.map(it => ({ ...it, dependencies: [] }));
}
