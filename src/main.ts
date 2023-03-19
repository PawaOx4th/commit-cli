import * as p from "@clack/prompts"
import { exec, spawnSync } from "node:child_process"
import color from "picocolors"

const typeForCommit = [
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
    label: "refactor🔨:",
    value: "refactor🔨:",
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

  p.intro(`Welcome to the commit-cli !!!.`)

  const commitWorkFlows = await p.group({
    selectType() {
      return p.select({
        message: "Commit type.",
        options: [...typeForCommit],
      })
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

      await exec(`git commit -m "${dataCommit}"`)
      s.stop()
    },
    success: () => {
      p.outro("Commit success !!!!")
      process.exit(0)
    },
  })
}

main().catch(() => {
  p.cancel("Cancel commit ")
  process.exit(0)
})
