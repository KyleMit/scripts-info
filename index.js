#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { styleText } from "node:util";

const audit = process.argv.includes("--audit") || process.argv.includes("-a");

const styleBold = (text) => styleText("bold", text);
const styleCyan = (text) => styleText("cyan", text);
const styleDim = (text) => styleText("dim", text);
const styleGreen = (text) => styleText("green", text);
const styleYellow = (text) => styleText("yellow", text);

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

const scripts = pkg["scripts"] ?? {};
const descriptions = pkg["scripts-info"] ?? {};
const scriptNames = Object.keys(scripts);
const descriptionNames = Object.keys(descriptions);


if (audit) {
  const missingDescriptions = scriptNames.filter((name) => descriptions[name] == null);
  const extraDescriptions = descriptionNames.filter((name) => scripts[name] == null);
  const auditCount = missingDescriptions.length + extraDescriptions.length;

  console.log(`\n${styleBold(pkg.name ?? "package")} scripts audit\n`);

  if (auditCount === 0) {
    console.log(styleGreen("  No script info issues found."));
    console.log();
    process.exit(0);
  }

  if (missingDescriptions.length > 0) {
    const width = Math.max(...missingDescriptions.map((name) => name.length));

    console.log(styleYellow("  Scripts missing info:"));
    for (const name of missingDescriptions) {
      console.log(`    ${styleCyan(name.padEnd(width))}  ${styleDim(scripts[name])}`);
    }
    console.log();
  }

  if (extraDescriptions.length > 0) {
    const width = Math.max(...extraDescriptions.map((name) => name.length));

    console.log(styleYellow("  Extra scripts-info entries:"));
    for (const name of extraDescriptions) {
      console.log(`    ${styleCyan(name.padEnd(width))}  ${descriptions[name]}`);
    }
    console.log();
  }

  process.exit(1);
}

if (scriptNames.length === 0) {
  console.log(`${pkg.name ?? "This package"} defines no scripts.`);
  process.exit(0);
}

const width = Math.max(...scriptNames.map((name) => name.length));

console.log(`\n${styleBold(pkg.name ?? "package")} scripts\n`);
for (const name of scriptNames) {
  const description = descriptions[name] ?? styleDim(scripts[name]);
  console.log(`  ${styleCyan(name.padEnd(width))}  ${description}`);
}
console.log();
