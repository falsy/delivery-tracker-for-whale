import { Meta, StoryObj } from "@storybook/react/*"
import BasicButton from "@components/atoms/BasicButton"

const meta = {
  title: "Atoms/BasicButton",
  component: BasicButton,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof BasicButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: "추가",
    handleClick: () => console.log("clicked")
  }
}
