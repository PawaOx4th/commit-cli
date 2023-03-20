#!/usr/bin/env node
'use strict';

const p = require('@clack/prompts');
const node_child_process = require('node:child_process');
const chalk = require('chalk');

function _interopNamespaceDefault(e) {
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const p__namespace = /*#__PURE__*/_interopNamespaceDefault(p);

const typeForCommit = [
  {
    label: "refactor\u{1F528}:",
    value: "refactor\u{1F528}:"
  },
  {
    value: "chore\u{1F916}:",
    label: "chore\u{1F916}:"
  },
  {
    label: "ci\u{1F3A1}:",
    value: "ci\u{1F3A1}:"
  },
  {
    label: "docs\u270F\uFE0F:",
    value: "docs\u270F\uFE0F:"
  },
  {
    label: "feat\u2728:",
    value: "feat\u2728:"
  },
  {
    label: "fix\u{1F41B}:",
    value: "fix\u{1F41B}:"
  },
  {
    label: "perf\u{1F680}:",
    value: "perf\u{1F680}:"
  },
  {
    label: "revert\u{1F500}:",
    value: "revert\u{1F500}:"
  },
  {
    label: "style\u{1F484}:",
    value: "style\u{1F484}:"
  },
  {
    label: "test\u{1F9EA}:",
    value: "test\u{1F9EA}:"
  },
  {
    label: "other\u{1F37B}:",
    value: "other\u{1F37B}:"
  },
  {
    label: "release\u2705\u{1F389}:",
    value: "release\u2705\u{1F389}:"
  }
];
async function main() {
  console.clear();
  node_child_process.exec("clear");
  p__namespace.intro(chalk.blue.bgBlack(`${"Welcome to the commit-cli !!!."}`));
  await p__namespace.group({
    async checkFileChange() {
      try {
        const res = node_child_process.execSync("git status -s").toString().trim();
        if (!res && res.length === 0)
          throw new Error("File change not commit.");
        return;
      } catch (error) {
        p__namespace.outro(`${chalk.yellowBright("File change not commit.")}`);
        process.exit(0);
      }
    },
    selectType() {
      const response = p__namespace.select({
        message: "Commit type.",
        options: [...typeForCommit]
      });
      return response;
    },
    commitMsg: () => p__namespace.text({
      message: "Commit message ?",
      validate: (value) => {
        if (!value)
          return "Please enter a message.";
      }
    }),
    display: ({ results }) => {
      p__namespace.note(`${results.selectType} ${results.commitMsg} ...`);
    },
    process: async (data) => {
      const s = p__namespace.spinner();
      s.start();
      const dataCommit = `${data.results.selectType} ${data.results.commitMsg}`;
      await node_child_process.spawnSync("git", ["add", "."]);
      await node_child_process.exec(`git commit -m "${dataCommit}"`);
      s.stop();
    },
    success: () => {
      p__namespace.outro("Commit success !!!!");
      process.exit(0);
    }
  });
}
main().catch(() => {
  p__namespace.cancel("Cancel commit .");
  process.exit(0);
});
