import { intro, note, outro, select, spinner, text } from "@clack/prompts"
import { exec, spawnSync } from "node:child_process"

async function main() {
  console.clear()
  intro("Welcome to the commit-cli demo! .")

  const selected = await select({
    message: "Commit type.",
    options: [
      {
        value: "chore🤖 :",
        label: "chore🤖 :",
      },
      {
        label: "ci🎡 :",
        value: "ci🎡 :",
      },
      {
        label: "docs✏️ :",
        value: "docs✏️ :",
      },
      {
        label: "feat✨ :",
        value: "feat✨ :",
      },
      {
        label: "fix🐛 :",
        value: "fix🐛 :",
      },
      {
        label: "perf🚀 :",
        value: "perf🚀 :",
      },
      {
        label: "refactor🔨 :",
        value: "refactor🔨 :",
      },
      {
        label: "revert🔀 :",
        value: "revert🔀 :",
      },
      {
        label: "style💄 :",
        value: "style💄 :",
      },
      {
        label: "test🧪 :",
        value: "test🧪 :",
      },
      {
        label: "other🍻 :",
        value: "other🍻 :",
      },
      {
        label: "release✅🎉 :",
        value: "release✅🎉 :",
      },
    ],
  })

  const commitMsg = await text({
    message: "Commit message ?",
    validate: (value) => {
      if (!value) return "Please enter a message."
    },
  })

  const dataCommit = `${selected}${commitMsg.toString()}`
  note(dataCommit, "Commit message ...")

  const s = spinner()
  s.start("Commit ...")
  await spawnSync("git", ["add", "."])
  await exec(`git commit -m "${dataCommit}"`)

  // await setTimeout(3000)

  s.stop("")
  outro("Commit success !!!!")
}

main()
