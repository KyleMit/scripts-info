# scripts-info

Zero-dependency npm helper that lists package scripts with their descriptions.


## Usage

Describe your scripts in a `scripts-info` section of your `package.json`, and
add an `info` script that invokes the helper:

```json
{
  "name": "my-project",
  "scripts": {
    "info": "npx scripts-info",
    "watch:build": "tsc --watch",
    "start": "node server.js"
  },
  "scripts-info": {
    "info": "Displays information about the scripts.",
    "watch:build": "Compiles the scripts and watches for changes.",
    "start": "Kickstarts the application."
  }
}
```

Then run:

```sh
npm run info
```

Output:

```log
my-project scripts

  info         Displays information about the scripts.
  watch:build  Compiles the scripts and watches for changes.
  start        Kickstarts the application.
```

To audit the `scripts-info` section, pass `--audit` or `-a`:

```sh
npx scripts-info --audit
```

Audit mode highlights scripts without info entries and `scripts-info` entries
that do not match a package script. It exits with `0` when no issues are found
and `1` when the audit finds missing or extra entries.


## Requirements

Node.js 20.12 or later. No dependencies.
