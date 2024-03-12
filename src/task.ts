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
 * Define tasks and specify summary
 * @param summary Task summary
 * @param tasks   Task items（arguments）
 * @returns 
 */
export function task(summary: string, dependencies: Array<Task>): Task;
export function task(summary: string, handler: TaskHandler): Task;
export function task(summary: string, dependencies: Array<Task>, handler: TaskHandler): Task;
export function task(summary: string, ...args: unknown[]): Task {
  const fistArg = args[0];
  const lastArg = args[args.length - 1];
  const dependencies: Array<Task> = Array.isArray(fistArg) ? fistArg : [];
  const handler = isTaskHandler(lastArg) ? lastArg : ((): unknown => void 0);
  return { summary, dependencies, handler };
}

/**
 * Parallel execution
 * @param tasks Task items（arguments）
 * @returns 
 */
export function P(...tasks: Task[]): Task {
  const handler = () => Promise.all(tasks.map(task => task.handler()));
  const summary = tasks.map(it => it.summary).join(',');
  const dependencies: Task[] = [];
  return { summary, dependencies, handler };
}
