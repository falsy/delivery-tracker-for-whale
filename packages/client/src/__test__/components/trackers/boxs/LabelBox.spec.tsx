/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LabelBox from "@components/trackers/boxs/LabelBox"

describe("LabelBox 컴포넌트", () => {
  const label = "initial label"
  const changeLabel = jest.fn()

  test("초기 렌더링 시 input에 tracker.label 값이 설정되어야 한다", () => {
    render(<LabelBox label={label} changeLabel={changeLabel} />)
    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )

    expect(input).toHaveValue("initial label")
  })

  test("input의 값을 변경했을 때 changeLabel 함수가 호출되어야 한다", async () => {
    render(<LabelBox label={label} changeLabel={changeLabel} />)
    const input = screen.getByPlaceholderText(
      "배송에 대한 간단한 메모를 적을 수 있어요."
    )

    await userEvent.clear(input)
    await userEvent.type(input, "new label")

    waitFor(() =>
      expect(changeLabel).toHaveBeenCalledWith({ label: "new label" })
    )
  })
})
