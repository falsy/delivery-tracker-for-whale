import { Meta, StoryObj } from "@storybook/react/*"
import Listbox from "@components/atoms/Listbox"
import { useState } from "react"

const meta = {
  title: "Atoms/Listbox",
  component: () => {
    const [selected, setSelected] = useState({
      id: "1",
      name: "Option 1"
    })

    const handleChange = (selected) => {
      setSelected(selected)
    }

    return (
      <Listbox
        selected={selected}
        onChange={handleChange}
        list={[
          {
            id: "1",
            name: "Option 1"
          },
          {
            id: "2",
            name: "Option 2"
          },
          {
            id: "3",
            name: "Option 3"
          }
        ]}
      />
    )
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {
    list: {
      control: {
        type: "object"
      }
    },
    selected: {
      control: {
        type: "text"
      }
    },
    onChange: {
      action: "onChange"
    }
  }
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    list: [
      {
        id: "1",
        name: "Option 1"
      },
      {
        id: "2",
        name: "Option 2"
      },
      {
        id: "3",
        name: "Option 3"
      }
    ],
    selected: {
      id: "1",
      name: "Option 1"
    },
    onChange: () => {}
  }
}
