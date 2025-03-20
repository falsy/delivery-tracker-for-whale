import { Meta, StoryObj } from "@storybook/react/*"
import LabelInput from "@components/atoms/LabelInput"

const meta = {
  title: "Atoms/LabelInput",
  component: LabelInput,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof LabelInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "이메일",
    changeLabel: () => console.log("changed")
  }
}
