import { Meta, StoryObj } from "@storybook/react/*"
import SubmitButton from "@components/atoms/SubmitButton"

const meta = {
  title: "Atoms/SubmitButton",
  component: SubmitButton,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof SubmitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    handleClick: () => console.log("clicked")
  }
}
