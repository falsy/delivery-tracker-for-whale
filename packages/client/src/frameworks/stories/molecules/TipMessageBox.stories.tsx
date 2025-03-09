import { Meta, StoryObj } from "@storybook/react/*"
import TipMessageBox from "@components/molecules/TipMessageBox"

const meta = {
  title: "Molecules/TipMessageBox",
  component: TipMessageBox,
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof TipMessageBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    resetTrackers: () => console.log("reset")
  }
}
