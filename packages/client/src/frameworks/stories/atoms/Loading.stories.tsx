import { Meta, StoryObj } from "@storybook/react/*"
import Loading from "@components/atoms/Loading"

const meta = {
  title: "Atoms/Loading",
  component: Loading,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
