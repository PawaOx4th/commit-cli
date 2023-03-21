#!/usr/bin/env node

import * as p from "@clack/prompts"
import { exec, spawnSync, execSync, spawn } from "node:child_process"
import chalk from "chalk"

const typeForCommit = [
  {
    label: "refactor🔨:",
    value: "refactor🔨:",
  },
  {
    value: "chore🤖:",
    label: "chore🤖:",
  },
  {
    label: "ci🎡:",
    value: "ci🎡:",
  },
  {
    label: "docs✏️:",
    value: "docs✏️:",
  },
  {
    label: "feat✨:",
    value: "feat✨:",
  },
  {
    label: "fix🐛:",
    value: "fix🐛:",
  },
  {
    label: "perf🚀:",
    value: "perf🚀:",
  },
  {
    label: "revert🔀:",
    value: "revert🔀:",
  },
  {
    label: "style💄:",
    value: "style💄:",
  },
  {
    label: "test🧪:",
    value: "test🧪:",
  },
  {
    label: "other🍻:",
    value: "other🍻:",
  },
  {
    label: "release✅🎉:",
    value: "release✅🎉:",
  },
]

async function main() {
  console.clear()

  exec("clear")

  p.intro(chalk.blue.bgBlack(`${"Welcome to the commit-cli !!!."}`))

  const commitWorkFlows = await p.group({
    async checkFileChange() {
      try {
        const res = execSync("git status -s").toString().trim()

        if (!res && res.length === 0) throw new Error("File change not commit.")

        return
      } catch (error) {
        // console.log("🔥 ERROR :", error)

        p.outro(`${chalk.yellowBright("File change not commit.")}`)
        process.exit(0)
      }
      // process.exit(0)
    },
    selectType() {
      const response = p.select({
        message: "Commit type.",
        options: [...typeForCommit],
      })

      return response
    },
    commitMsg: () =>
      p.text({
        message: "Commit message ?",
        validate: (value) => {
          if (!value) return "Please enter a message."
        },
      }),
    display: ({ results }) => {
      p.note(`${results.selectType} ${results.commitMsg} ...`)
    },
    process: async (data) => {
      const s = p.spinner()
      s.start()
      const dataCommit = `${data.results.selectType} ${data.results.commitMsg}`
      await spawnSync("git", ["add", "."])

      spawn(`git commit -m "${dataCommit}"`, {
        shell: true,
        stdio: [0, 1, 2],
      })
      s.stop()
    },
    success: () => {
      p.outro("Commit success !!!!")
      process.exit(0)
    },
  })
}

main().catch(() => {
  p.cancel("Cancel commit .")
  process.exit(0)
})
