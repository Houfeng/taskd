import { $, task } from "./lib/index.js";

export const lint = task('代码检查', async () => {
  await $`echo 代码检查`;
});

export const test = task('单元测试', [lint], async () => {
  await $`zx -v`
  await $`echo 单元测试`;
});

export default lint;