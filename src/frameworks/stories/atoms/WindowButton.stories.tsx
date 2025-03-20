import { Meta, StoryObj } from "@storybook/react/*"
import WindowButton from "@components/atoms/WindowButton"

const meta = {
  title: "Atoms/WindowButton",
  component: WindowButton,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof WindowButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    url: "https://falsy.me"
  }
}
