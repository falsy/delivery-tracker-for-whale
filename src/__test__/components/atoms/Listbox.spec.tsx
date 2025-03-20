import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Listbox from "@components/atoms/Listbox"

describe("Listbox", () => {
  const list = [
    { id: "1", name: "옵션 1" },
    { id: "2", name: "옵션 2" },
    { id: "3", name: "옵션 3" }
  ]

  it("초기 선택된 항목이 올바르게 표시되는지 확인", () => {
    render(<Listbox list={list} selected={list[0]} onChange={() => {}} />)

    expect(screen.getByTestId("carrier-select-box")).toHaveTextContent("옵션 1")
  })

  it("드롭다운을 클릭하면 옵션 목록이 열리는지 확인", async () => {
    render(<Listbox list={list} selected={list[0]} onChange={() => {}} />)

    const button = screen.getByTestId("carrier-select-box")
    fireEvent.click(button)

    expect(screen.getByText("옵션 2")).toBeInTheDocument()
    expect(screen.getByText("옵션 3")).toBeInTheDocument()
  })

  it("옵션을 클릭하면 onChange 핸들러가 호출되는지 확인", () => {
    const handleChange = vi.fn()
    render(<Listbox list={list} selected={list[0]} onChange={handleChange} />)

    const button = screen.getByTestId("carrier-select-box")
    fireEvent.click(button)

    const option = screen.getByText("옵션 2")
    fireEvent.click(option)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(list[1])
  })
})
