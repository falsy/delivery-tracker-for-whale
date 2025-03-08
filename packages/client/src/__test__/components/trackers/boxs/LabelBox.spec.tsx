/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import LabelBox from "@components/trackers/boxs/LabelBox"

describe("LabelBox 컴포넌트", () => {
  const label = "initial label"
  const changeLabel = vi.fn()

  it("초기 렌더링 시 input에 tracker.label 값이 설정되어야 한다", () => {
    render(<LabelBox label={label} changeLabel={changeLabel} />)
    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )

    expect(input).toHaveValue("initial label")
  })

  it("input의 값을 변경했을 때 changeLabel 함수가 호출되어야 한다", async () => {
    render(<LabelBox label={label} changeLabel={changeLabel} />)
    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )

    fireEvent.input(input, { target: { value: "new label" } })

    expect(changeLabel).toHaveBeenCalledTimes(1)
    expect(changeLabel).toHaveBeenCalledWith("new label")
  })
})
