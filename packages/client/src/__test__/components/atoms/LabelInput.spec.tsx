import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import LabelInput from "@components/atoms/LabelInput"

describe("LabelInput", () => {
  it("입력 필드가 정상적으로 렌더링되는지 확인", () => {
    render(<LabelInput label="테스트 라벨" changeLabel={() => {}} />)

    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("테스트 라벨")
  })

  it("사용자가 입력하면 changeLabel 핸들러가 호출되는지 확인", () => {
    const changeLabel = vi.fn()
    render(<LabelInput label="초기값" changeLabel={changeLabel} />)

    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )
    fireEvent.change(input, { target: { value: "새로운 라벨" } })

    expect(changeLabel).toHaveBeenCalledTimes(1)
    expect(changeLabel).toHaveBeenCalledWith("새로운 라벨")
  })
})
