import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkgFile = resolve(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgFile, 'utf-8'));

export const version: string = pkg.version;