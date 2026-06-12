#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { styleText } from "node:util";

const styleBold = (text) => styleText("bold", text);
const styleCyan = (text) => styleText("cyan", text);
const styleDim = (text) => styleText("dim", text);

const pkg = await readPackageJson();
const scripts = pkg["scripts"] ?? {};
const descriptions = pkg["scripts-info"] ?? {};
const scriptNames = Object.keys(scripts);

if (scriptNames.length === 0) {
  console.log("package.json doesn't have any scripts");
  process.exit(0);
}

const width = Math.max(...scriptNames.map((name) => name.length));

console.log(`\n${styleBold(pkg.name ?? "package")} scripts\n`);
for (const name of scriptNames) {
  const description = descriptions[name] ?? styleDim(scripts[name]);
  console.log(`  ${styleCyan(name.padEnd(width))}  ${description}`);
}
console.log();


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
