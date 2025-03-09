import { Meta, StoryObj } from "@storybook/react/*"
import Footer from "@components/atoms/Footer"

const meta = {
  title: "Atoms/Footer",
  component: Footer,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
