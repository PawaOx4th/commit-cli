#!/usr/bin/env node
import * as p from '@clack/prompts';
import { exec, execSync, spawnSync } from 'node:child_process';
import chalk from 'chalk';

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
  exec("clear");
  p.intro(chalk.blue.bgBlack(`${"Welcome to the commit-cli !!!."}`));
  await p.group({
    async checkFileChange() {
      try {
        const res = execSync("git status -s").toString().trim();
        if (!res && res.length === 0)
          throw new Error("File change not commit.");
        return;
      } catch (error) {
        p.outro(`${chalk.yellowBright("File change not commit.")}`);
        process.exit(0);
      }
    },
    selectType() {
      const response = p.select({
        message: "Commit type.",
        options: [...typeForCommit]
      });
      return response;
    },
    commitMsg: () => p.text({
      message: "Commit message ?",
      validate: (value) => {
        if (!value)
          return "Please enter a message.";
      }
    }),
    display: ({ results }) => {
      p.note(`${results.selectType} ${results.commitMsg} ...`);
    },
    process: async (data) => {
      const s = p.spinner();
      s.start();
      const dataCommit = `${data.results.selectType} ${data.results.commitMsg}`;
      await spawnSync("git", ["add", "."]);
      await exec(`git commit -m "${dataCommit}"`);
      s.stop();
    },
    success: () => {
      p.outro("Commit success !!!!");
      process.exit(0);
    }
  });
}
main().catch(() => {
  p.cancel("Cancel commit .");
  process.exit(0);
});
