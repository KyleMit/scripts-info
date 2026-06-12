# scripts-helper

A tiny, zero-dependency npm helper that lists your package scripts along with
human-readable descriptions.


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

Script names are shown in color when the output is a terminal (set `NO_COLOR`
to disable). Scripts without an entry in `scripts-info` fall back to showing
their command, dimmed.

This repository eats its own dog food — run `npm run info` here to see it in
action.

## Requirements

Node.js 20.12 or later. No dependencies.
