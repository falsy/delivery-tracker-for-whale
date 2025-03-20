import { Meta, StoryObj } from "@storybook/react/*"
import MemoBox from "@components/molecules/MemoBox"

const meta = {
  title: "Molecules/MemoBox",
  component: MemoBox,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof MemoBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    memos: ["메모1", "메모2", "메모3"],
    changeMemo: () => console.log("changed")
  }
}
