#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { styleText } from "node:util";

async function readPackageJson() {
  try {
    const raw = await readFile("package.json", "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(
      error.code === "ENOENT"
        ? "No package.json found in the current directory."
        : `Could not read package.json: ${error.message}`
    );
    process.exit(1);
  }
}

const pkg = await readPackageJson();

const scripts = pkg.scripts ?? {};
const descriptions = pkg["scripts-info"] ?? {};
const names = Object.keys(scripts);

if (names.length === 0) {
  console.log(`${pkg.name ?? "This package"} defines no scripts.`);
  process.exit(0);
}

const width = Math.max(...names.map((name) => name.length));

console.log(`\n${styleText("bold", pkg.name ?? "package")} scripts\n`);
for (const name of names) {
  const description = descriptions[name] ?? styleText("dim", scripts[name]);
  console.log(`  ${styleText("cyan", name.padEnd(width))}  ${description}`);
}
console.log();
