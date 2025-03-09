import { Meta, StoryObj } from "@storybook/react/*"
import Header from "@components/atoms/Header"

const meta = {
  title: "Atoms/Header",
  component: Header,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
