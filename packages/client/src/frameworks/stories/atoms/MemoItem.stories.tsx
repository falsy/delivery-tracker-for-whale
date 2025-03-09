import { Meta, StoryObj } from "@storybook/react/*"
import MemoItem from "@components/atoms/MemoItem"

const meta = {
  title: "Atoms/MemoItem",
  component: MemoItem,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof MemoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    index: 0,
    memos: ["memo", "memo2"],
    changeMemo: () => console.log("changed")
  }
}
